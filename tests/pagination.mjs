import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { createServer } from 'vite'

// Only SSR modules are used; no browser dependency scan should outlive this test.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
try {
  const { DataTablePagination } = await server.ssrLoadModule('/src/components/data-table/pagination.tsx')
  const render = (rowCount, pageIndex = 0) => {
    const table = createTable({
      data: Array.from({ length: rowCount }, (_, id) => ({ id })),
      columns: [{ accessorKey: 'id' }],
      state: { pagination: { pageIndex, pageSize: 10 } },
      onStateChange() {},
      renderFallbackValue: null,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })
    return renderToStaticMarkup(createElement(DataTablePagination, { table }))
  }
  const button = (html, label) => [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].find((match) => match[2].includes(label))
  for (const pageIndex of [0, 5]) {
    const html = render(0, pageIndex)
    assert.match(html, /Page 0 of 0/)
    assert.doesNotMatch(html, /Go to page [0-9]/)
    for (const label of ['Go to first page', 'Go to previous page', 'Go to next page', 'Go to last page']) {
      assert.match(button(html, label)?.[1] ?? '', /disabled=""/, `Empty ${label} is disabled`)
    }
    assert.match(html, /shrink-0[^"<>]*whitespace-nowrap/)
  }
  const first = render(100)
  assert.match(first, /Page 1 of 10/)
  assert.match(first, /Go to page 10/)
  assert.match(button(first, 'Go to previous page')[1], /disabled=""/)
  assert.doesNotMatch(button(first, 'Go to next page')[1], /disabled=""/)
  const last = render(100, 9)
  assert.match(last, /Page 10 of 10/)
  assert.match(button(last, 'Go to next page')[1], /disabled=""/)
  assert.doesNotMatch(button(last, 'Go to previous page')[1], /disabled=""/)
  assert.match(render(3), /Page 1 of 1/)
  // House-created IDs have eight UUID characters instead of the donor's four
  // digits. A fixed 80px ID cell let those IDs paint into the next label cell.
  const { tasksColumns } = await server.ssrLoadModule('/src/features/tasks/components/tasks-columns.tsx')
  const idColumn = tasksColumns.find(column => column.accessorKey === 'id')
  for (const id of ['TASK-9366', 'TASK-FB5D9041', 'TASK-D961E7CF']) {
    const html = renderToStaticMarkup(idColumn.cell({ row: { getValue: () => id } }))
    assert.match(html, /class="min-w-20 whitespace-nowrap"/)
    assert.ok(html.includes(id), 'The complete task ID remains visible')
    assert.doesNotMatch(html, /class="w-20"|truncate|overflow-hidden/)
  }
  console.log('PASS: task ID cells preserve the donor minimum width while fitting longer House-created IDs without wrapping or truncation. Actual browser geometry is checked separately.')
  console.log('PASS: server-rendered donor pagination: empty and stale-empty indexes, disabled navigation, no phantom page, nonwrapping labels, 100-row first/last pages and reduced results. Hosted visual acceptance remains separate.')
} finally {
  await server.close()
}
