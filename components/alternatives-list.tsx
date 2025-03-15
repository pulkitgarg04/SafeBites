type Alternative = {
  name: string;
  description: string;
};

type AlternativesListProps = {
  alternatives: Alternative[];
};

export default function AlternativesList({
  alternatives,
}: AlternativesListProps) {
  if (alternatives.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-slate-500">
          No alternatives to suggest at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-800">
        Suggested Alternatives
      </h3>
      <ul className="space-y-3">
        {alternatives.map((alternative, index) => (
          <li key={index} className="p-3 rounded-md bg-slate-50">
            <h4 className="font-medium text-slate-800">{alternative.name}</h4>
            <p className="text-sm text-slate-600 mt-1">
              {alternative.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
