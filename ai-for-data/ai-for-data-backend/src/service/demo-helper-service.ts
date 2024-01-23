import { SquidService, executable } from '@squidcloud/backend';

export class AddDataService extends SquidService {
  @executable()
  async addMockData(): Promise<void> {
    const votes = ['cat', 'dog', 'bird', 'fish', 'reptile'];
    // add 30 random documents to the animals collection
    await this.squid.runInTransaction(async (transactionId: string) => {
      for (let i = 0; i < 30; i++) {
        const favPet = votes[Math.floor(Math.random() * votes.length)];
        // hopefully people's current pet is more likely to be their favorite, so let's improve those odds
        const currPetVotes = [...votes, favPet, favPet, favPet, favPet];
        const currPet = currPetVotes[Math.floor(Math.random() * currPetVotes.length)];
        this.squid.collection('animals').doc().insert({ favorite_pet: favPet, current_pet: currPet }, transactionId);
      }
    });
    console.log('Done adding pets');
  }
}
