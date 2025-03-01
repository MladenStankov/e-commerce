/*
  Warnings:

  - You are about to drop the column `condition` on the `ProductStock` table. All the data in the column will be lost.
  - Changed the type of `size` on the `ProductStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SIZE_16', 'SIZE_17', 'SIZE_18', 'SIZE_19', 'SIZE_20', 'SIZE_21', 'SIZE_22', 'SIZE_23', 'SIZE_24', 'SIZE_25', 'SIZE_26', 'SIZE_27', 'SIZE_28', 'SIZE_29', 'SIZE_30', 'SIZE_31', 'SIZE_32', 'SIZE_33', 'SIZE_34', 'SIZE_35', 'SIZE_36', 'SIZE_37', 'SIZE_38', 'SIZE_39', 'SIZE_40', 'SIZE_41', 'SIZE_42', 'SIZE_43', 'SIZE_44', 'SIZE_45', 'SIZE_46', 'SIZE_47', 'SIZE_48', 'SIZE_49', 'SIZE_50');

-- AlterTable
ALTER TABLE "ProductStock" DROP COLUMN "condition",
DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL;

-- DropEnum
DROP TYPE "Condition";
