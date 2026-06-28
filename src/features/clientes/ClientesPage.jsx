import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientesService } from "./clientesService";
import ClienteForm from "./ClienteForm";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ClientesPage() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => clientesService.listar().then((r) => r.data),
  });

  const deletar = useMutation({
    mutationFn: (id) => clientesService.deletar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
  });

  const handleEditar = (cliente) => {
    setClienteSelecionado(cliente);
    setFormOpen(true);
  };

  const handleNovo = () => {
    setClienteSelecionado(null);
    setFormOpen(true);
  };

  const handleFechar = () => {
    setClienteSelecionado(null);
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clientes</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Gerencie os clientes da concessionária
          </p>
        </div>
        <Button
          onClick={handleNovo}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Cliente
        </Button>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-zinc-400">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">E-mail</th>
              <th className="text-left px-4 py-3">Telefone</th>
              <th className="text-left px-4 py-3">CPF</th>
              <th className="text-left px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-zinc-500">
                  Carregando...
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-zinc-500">
                  Nenhum cliente cadastrado
                </td>
              </tr>
            ) : (
              data?.map((cliente) => (
                <tr
                  key={cliente.clienteID}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-zinc-200">{cliente.nome}</td>
                  <td className="px-4 py-3 text-zinc-200">{cliente.email}</td>
                  <td className="px-4 py-3 text-zinc-200">
                    {cliente.telefone}
                  </td>
                  <td className="px-4 py-3 text-zinc-200">{cliente.cpf}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditar(cliente)}
                        className="p-1.5 rounded text-zinc-400 hover:text-blue-400 hover:bg-zinc-700 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => deletar.mutate(cliente.clienteID)}
                        className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <ClienteForm cliente={clienteSelecionado} onClose={handleFechar} />
      )}
    </div>
  );
}
