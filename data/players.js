export const players = [
  { name: "van Damme", id: 1, color: "ab48fc" },
  { name: "Madonna", id: 2, color: "48fc51" },
  { name: "Sigourney", id: 8, color: "fc5148" },
  { name: "Stallone", id: 9, color: "4851fc" },
  { name: "Wolverine", id: 10, color: "fc48f3" },
];

export function getRandomPlayer(players) {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
}