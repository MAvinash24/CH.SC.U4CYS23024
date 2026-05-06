
---

# `notification_system_design.md`

```md
# Stage 1

## Priority Logic

Priority order:

1. Placement
2. Result
3. Event

Recency is also considered.

Formula:

score = priority_weight * 100 - minutes_old

## Efficient Maintenance

- Fetch latest notifications periodically
- Maintain sorted in-memory array
- Recalculate top N dynamically
- Use memoization for frontend optimization

## Tech Stack

- React
- TypeScript
- Material UI
- Axios