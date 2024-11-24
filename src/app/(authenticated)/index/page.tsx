'use client';

import CadastrarProdutoModal from "@/components/modals/cadastrar-produto-modal";
import Table from "@/components/ui/table";



export default function AuthenticatedHome() {
  return (
    <>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
          <CadastrarProdutoModal />
          <Table />
      </section>

    </>
  );
}
