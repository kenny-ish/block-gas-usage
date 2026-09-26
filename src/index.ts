import { parseArgs } from "node:util";
import { rpc } from "./rpc.ts";
import { bar } from "./bar.ts";

const { values } = parseArgs({ options: { rpc: { type: "string", default: "https://ethereum-rpc.publicnode.com" }, blocks: { type: "string", default: "20" } } });
const head = parseInt(await rpc<string>(values.rpc, "eth_blockNumber"), 16);
const n = Number(values.blocks);
type B = { number: string; gasUsed: string; gasLimit: string; baseFeePerGas?: string };
const blocks = await Promise.all(Array.from({ length: n }, (_, i) => rpc<B>(values.rpc, "eth_getBlockByNumber", ["0x" + (head - n + 1 + i).toString(16), false])));
let sum = 0;
for (const b of blocks) {
  const r = parseInt(b.gasUsed, 16) / parseInt(b.gasLimit, 16);
  sum += r;
  const fee = b.baseFeePerGas ? `${(parseInt(b.baseFeePerGas, 16) / 1e9).toFixed(3)} gwei` : "";
  console.log(`${parseInt(b.number, 16)}  ${bar(r)} ${(r * 100).toFixed(0).padStart(3)}%  ${fee}`);
}
console.log(`average utilization ${((sum / n) * 100).toFixed(1)}% (target 50%, marked with |)`);
