import { AlertCircle, LoaderCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TasksProvider, useTasks } from './components/tasks-provider'
import { TasksTable } from './components/tasks-table'

function TasksContent() {
  const { tasks, loading, error, busy, syncLabel, drafts, room, openCreate } = useTasks()

  return (
    <>
      <Header fixed>
        {syncLabel && <span className='me-auto min-w-0 truncate text-sm text-muted-foreground' role='status' title={syncLabel}>
          {syncLabel}
        </span>}
        <ThemeSwitch />
      </Header>

      <Main id='tasks-content' className='flex min-w-0 flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Keep track of your tasks in one place.
            </p>
          </div>
          <fieldset disabled={busy || loading || !!error}>
            <TasksPrimaryButtons />
          </fieldset>
        </div>
        {drafts.some(draft => draft.room === room && draft.parts.creation && 'type' in draft.parts.creation && draft.parts.creation.type === 'task') && <section aria-label='Task drafts' className='flex flex-wrap gap-2'>
          {drafts.filter(draft => draft.room === room && draft.parts.creation && 'type' in draft.parts.creation && draft.parts.creation.type === 'task').map(draft => <button key={draft.path} className='rounded border px-3 py-1 text-sm' onClick={() => openCreate(draft.path)}>Draft: {draft.parts.creation && 'fields' in draft.parts.creation ? String(draft.parts.creation.fields.title || 'New task') : 'New task'}</button>)}
        </section>}
        {error ? (
          <Alert variant='destructive' role='alert'>
            <AlertCircle />
            <AlertTitle>Tasks could not be loaded</AlertTitle>
            <AlertDescription className='[overflow-wrap:anywhere]'>{error}</AlertDescription>
          </Alert>
        ) : loading ? (
          <div className='flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground' role='status'>
            <LoaderCircle className='size-4 animate-spin' />
            Loading tasks…
          </div>
        ) : (
          <TasksTable data={tasks} />
        )}
      </Main>
      <TasksDialogs />
    </>
  )
}

export function Tasks() {
  return (
    <TasksProvider>
      <TasksContent />
    </TasksProvider>
  )
}
