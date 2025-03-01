"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import prisma from "@/lib/prisma";
import { createProductForm } from "@/lib/zod-schemas";
import type { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function createProduct(data: z.infer<typeof createProductForm>) {
  try {
    const validated = createProductForm.parse(data);
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (session?.user.role !== "admin") {
      unauthorized();
    }
    if (
      await prisma.product.findUnique({
        where: { slug: validated.title.toLowerCase().replace(/\s+/g, "-") },
      })
    ) {
      return { error: "A product with this title already exists" };
    }

    const uploadsDir = join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw error;
      }
    }

    const imagePromises = validated.imageFiles.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name}`;
      const uploadPath = join(uploadsDir, filename);

      await writeFile(uploadPath, buffer);
      return `/uploads/${filename}`;
    });

    const imagePaths = await Promise.all(imagePromises);

    const product = await prisma.product.create({
      data: {
        title: validated.title,
        category: validated.category,
        description: validated.description,
        priceInEuroCents: validated.priceInCents,
        slug: validated.title.toLowerCase().replace(/\s+/g, "-"),
        productStocks: {
          create: validated.sizes.flatMap((productSize) =>
            Array.from({ length: productSize.quantity }).map(() => ({
              size: productSize.size,
              available: true,
            }))
          ),
        },
        productImages: {
          create: imagePaths.map((path) => ({
            imagePath: path,
          })),
        },
      },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { slug: product.slug };
  } catch (error) {
    console.log(error);
  }
}
