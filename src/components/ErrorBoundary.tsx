import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="fatal-error">
          <h1>Ocorreu um erro ao iniciar a app</h1>
          <pre>{this.state.error.message}</pre>
          <p>
            Abra a consola do navegador (F12 → Consola) para mais detalhes. Se
            estiver a abrir um ficheiro HTML diretamente no disco, use{' '}
            <code>npm run dev</code> ou <code>npm run preview</code>.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
