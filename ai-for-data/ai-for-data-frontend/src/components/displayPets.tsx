import { FavoritePets } from '../common/favoritePets';

interface FavoritePetsProps {
  favoritePets: FavoritePets[];
}

const DisplayPets: React.FC<FavoritePetsProps> = ({ favoritePets }) => {
  return (
    <div className="scrolling">
      <table>
        <thead>
          <tr>
            <th>Current Pet Owned</th>
            <th>Favorite Pet</th>
          </tr>
        </thead>
        <tbody>
          {favoritePets.map((entry, index) => (
            <tr key={index}>
              <td>{entry.current_pet}</td>
              <td>{entry.favorite_pet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayPets;
