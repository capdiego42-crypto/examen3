// components/stats/StatCard.js
export default function StatCard({ name, value, suffix = "", hint = "", Icon = null }) {
  // if/else: control simple de valor vacío
  const display = value === null || value === undefined || value === "" ? "—" : value;

  return (
    <div className="flex flex-col-reverse gap-1">
      <dt className="text-base/7 text-gray-300">{name}</dt>
      <dd className="flex items-center gap-2 text-4xl font-semibold tracking-tight text-white">
        {Icon ? <Icon aria-hidden="true" className="h-7 w-7" /> : null}
        <span>
          {display}
          {suffix ? <span className="text-gray-300 text-2xl"> {suffix}</span> : null}
        </span>
      </dd>
      {hint ? <dd className="text-xs text-gray-400">{hint}</dd> : null}
    </div>
  );
}