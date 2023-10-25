// sleep.js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const ms = process.argv[2] ? Number(process.argv[2]) : 0;
  if (isNaN(ms)) {
    console.error('Please provide a number as argument');
    process.exit(1);
  }

  await sleep(ms);
}

main().then();
