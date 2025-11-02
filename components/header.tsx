export function Header() {
  return (
    <header className="border-b border-amber-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-amber-900">🎁 Chá de Casa Nova</h1>
            <p className="text-amber-700 mt-1">Beatriz & Giovani</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-amber-600">Bem-vindo!</div>
          </div>
        </div>
      </div>
    </header>
  )
}
