import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { deleteIdea, fetchIdea } from '@/api/ideas';

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const navigate = useNavigate();
  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: '/ideas' });
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this idea?'
    );
    if (confirmDelete) {
      await deleteMutate();
    }
  };

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-500 block mb-4 hover:underline">
        <div className="flex items-center">← Back to Ideas</div>
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}!</h2>
      <p className="mt-2">{idea.description}</p>

      {/* Edit Link */}
      <Link
        to="/ideas/$ideaId/edit"
        params={{ ideaId }}
        className="inline-block text-sm bg-yellow-500 
          hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2
          rounded transition"
      >
        Edit
      </Link>

      {/* Delete Button */}
      <button
        className="text-sm bg-red-600 hover:bg-red-700 
          text-white mt-4 px-4 py-2 rounded transition 
          disabled:opacity:50"
        disabled={isPending}
        onClick={handleDelete}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
