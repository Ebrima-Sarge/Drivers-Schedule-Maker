export function History({ history }) {
  // If history is undefined or empty, return null or a message
  if (!history || history.length === 0) return null;

  return (
    <ul>
      {history.map((ride, index) => (
        <li key={index}>
          {ride.firstName} {ride.lastName} - {ride.pickOff}
        </li>
      ))}
    </ul>
  );
}