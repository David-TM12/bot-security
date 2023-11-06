/*
  Warnings:

  - Added the required column `categoria_id` to the `ocorrencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `ocorrencias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ocorrencias" ADD COLUMN     "categoria_id" TEXT NOT NULL,
ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ocorrencias" ADD CONSTRAINT "ocorrencias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ocorrencias" ADD CONSTRAINT "ocorrencias_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
