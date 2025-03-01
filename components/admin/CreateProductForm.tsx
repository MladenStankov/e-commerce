"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Size } from "@prisma/client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import PriceInput from "../PriceInput";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { formatSize } from "@/lib/formatters";
import { cn, getSizesForCategory } from "@/lib/utils";
import Image from "next/image";
import { createProduct } from "@/app/actions/admin";
import { createProductForm } from "@/lib/zod-schemas";
import { CheckCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { triggerConfetti } from "@/lib/confetti";

export default function CreateProductForm() {
  const form = useForm<z.infer<typeof createProductForm>>({
    resolver: zodResolver(createProductForm),
    defaultValues: {
      title: "",
      description: "",
      imageFiles: [],
      category: Category.MEN,
      priceInCents: 0,
      sizes: [],
    },
  });
  const [focusedSize, setFocusedSize] = React.useState<Size | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof createProductForm>) => {
    setIsLoading(true);
    const result = await createProduct(data);
    setIsLoading(false);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
      form.setError("title", { message: result.error });
      form.setFocus("title");
    } else {
      setIsSuccess(true);
      triggerConfetti();
      setTimeout(() => {
        router.push(`/product/${result?.slug}`);
      }, 2000);
    }
  };

  const handleChangeSize = (
    e: React.ChangeEvent<HTMLInputElement>,
    size: Size
  ) => {
    const newSize = {
      size,
      quantity: parseInt(e.target.value, 10) || 0,
    };

    if (newSize.quantity > 0) {
      form.setValue("sizes", [
        ...form.getValues("sizes").filter((s) => s.size !== size),
        newSize,
      ]);
    } else {
      form.setValue("sizes", [
        ...form.getValues("sizes").filter((s) => s.size !== size),
      ]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 relative p-2"
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center backdrop-blur-[2px]",
            !isLoading && !isSuccess && "hidden"
          )}
        >
          <Card className="rounded-sm p-6">
            {isLoading && (
              <Loader size={30} className="text-primary animate-spin" />
            )}
            {isSuccess && (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle size={40} className="text-primary" />
                <p className="text-xl font-semibold flex flex-col items-center">
                  Product created successfully!{" "}
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    Redirecting to products page...
                    <Loader size={15} className="text-primary animate-spin" />
                  </span>
                </p>
              </div>
            )}
          </Card>
        </div>

        <h1 className="text-3xl text-primary font-semibold">
          Create a Sneaker Product
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the name of the sneaker"
                    className="h-12"
                    id="title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Category).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter more in depth about the sneaker and add some tags for better searchability"
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceInCents"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                Price in Euro
              </FormLabel>
              <FormControl>
                <PriceInput
                  value={field.value / 100}
                  onChange={(value) => field.onChange(Math.round(value * 100))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                Product Images
              </FormLabel>
              <FormControl>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center"
                  onDrop={(e) => {
                    e.preventDefault();
                    field.onChange(Array.from(e.dataTransfer.files));
                  }}
                >
                  <Input
                    accept=".jpg, .jpeg, .png, .svg, .gif"
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) =>
                      field.onChange(
                        e.target.files ? Array.from(e.target.files) : []
                      )
                    }
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-primary hover:underline underline-offset-4"
                  >
                    Click to upload images
                  </label>
                </div>
              </FormControl>
              <FormMessage />

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {form.getValues("imageFiles").map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sizes"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Sizes</FormLabel>
              <Card className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-4">
                {getSizesForCategory(form.getValues("category")).map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    type="button"
                    onClick={() => setFocusedSize(size)}
                    className={cn(
                      "text-lg min-h-[4rem] h-fit flex flex-col items-center transition-all duration-300 hover:bg-accent/20",
                      focusedSize === size && "ring-2 ring-primary"
                    )}
                  >
                    <span className="font-medium">
                      {formatSize(size, form.getValues("category"))}
                    </span>
                    {focusedSize === size ? (
                      <Input
                        type="number"
                        placeholder="Qty"
                        className="w-20 mt-2 text-center"
                        onChange={(e) => handleChangeSize(e, size)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setFocusedSize(null);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground mt-1">
                        Qty:{" "}
                        {form.getValues("sizes").find((s) => s.size === size)
                          ?.quantity || 0}
                      </span>
                    )}
                  </Button>
                ))}
              </Card>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 text-lg font-semibold mt-8 bg-primary hover:bg-primary/90"
        >
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
