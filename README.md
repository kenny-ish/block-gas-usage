# block-gas-usage

Draws gas used against the gas limit for recent blocks, one bar per block, with the base fee and
the average utilization. EIP-1559 targets 50% of the gas limit, and blocks above the target push the
base fee up.

```bash
node src/index.ts
node src/index.ts --blocks 40 --rpc https://mainnet.base.org
```

```bash
npm test
```
