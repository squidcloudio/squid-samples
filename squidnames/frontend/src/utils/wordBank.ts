// wordBank.ts
const wordList: string[] = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Icaco', 'Jackfruit',
  'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Olive',
  'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tomato',
  'Ugli', 'Vanilla', 'Watermelon', 'Xigua', 'Yuzu',
  'Acacia', 'Blueprint', 'Cascade', 'Dynamo', 'Eclipse',
  'Falcon', 'Gargoyle', 'Harpoon', 'Iguana', 'Juggernaut',
  'Kaleidoscope', 'Labyrinth', 'Maverick', 'Nebula', 'Oracle',
  'Paradox', 'Quantum', 'Rhapsody', 'Serenity', 'Tundra',
  'Utopia', 'Vortex', 'Willow', 'Xenon', 'Yacht',
  'Zenith', 'Aurora', 'Begonia', 'Cobalt', 'Drizzle',
  'Ember', 'Flamingo', 'Glacier', 'Horizon', 'Iris',
  'Juniper', 'Krypton', 'Lantern', 'Mirage', 'Nectar',
  'Obsidian', 'Prism', 'Quill', 'Reef', 'Solstice',
  'Tornado', 'Universe', 'Velocity', 'Whirlwind', 'Zephyr'
];

const getRandomWords = (numWords: number): string[] => {
  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numWords);
};

export { getRandomWords };
