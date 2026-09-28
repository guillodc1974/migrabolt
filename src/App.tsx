import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CarFront,
  ChevronDown,
  CircleDollarSign,
  Download,
  Gauge,
  LayoutDashboard,
  Search,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './App.css'

type Period = '7d' | '30d' | '90d'

const periodLabels: Record<Period, string> = {
  '7d': '7 días',
  '30d': '30 días',
  '90d': '90 días',
}

const summaries: Record<Period, { sales: string; revenue: string; margin: string; stock: string; conversion: string; financed: string; salesChange: string; revenueChange: string; marginChange: string; stockChange: string; conversionChange: string; financedChange: string }> = {
  '7d': { sales: '11', revenue: '$ 328 M', margin: '19,2%', stock: '126', conversion: '17,8%', financed: '61%', salesChange: '+10,0%', revenueChange: '+7,8%', marginChange: '+0,8 pp', stockChange: '-3,1%', conversionChange: '+1,4 pp', financedChange: '+3,2 pp' },
  '30d': { sales: '42', revenue: '$ 1.284 M', margin: '18,7%', stock: '126', conversion: '18,4%', financed: '64%', salesChange: '+12,6%', revenueChange: '+8,4%', marginChange: '+1,2 pp', stockChange: '-4,1%', conversionChange: '+2,1 pp', financedChange: '+5,2 pp' },
  '90d': { sales: '119', revenue: '$ 3.612 M', margin: '18,1%', stock: '126', conversion: '17,2%', financed: '59%', salesChange: '+9,2%', revenueChange: '+6,7%', marginChange: '+0,6 pp', stockChange: '-2,4%', conversionChange: '+0,9 pp', financedChange: '+2,8 pp' },
}

const chartData: Record<Period, { label: string; revenue: number; goal: number }[]> = {
  '7d': [
    { label: 'Lun', revenue: 34, goal: 38 }, { label: 'Mar', revenue: 48, goal: 42 },
    { label: 'Mié', revenue: 41, goal: 43 }, { label: 'Jue', revenue: 63, goal: 48 },
    { label: 'Vie', revenue: 52, goal: 48 }, { label: 'Sáb', revenue: 70, goal: 55 },
    { label: 'Dom', revenue: 20, goal: 24 },
  ],
  '30d': [
    { label: 'Sem 1', revenue: 248, goal: 260 }, { label: 'Sem 2', revenue: 302, goal: 275 },
    { label: 'Sem 3', revenue: 276, goal: 290 }, { label: 'Sem 4', revenue: 458, goal: 330 },
  ],
  '90d': [
    { label: 'Jul', revenue: 1020, goal: 1080 }, { label: 'Ago', revenue: 1180, goal: 1120 },
    { label: 'Sep', revenue: 1412, goal: 1250 },
  ],
}

const brandData = [
  { name: 'Toyota', value: 31, color: '#286b54' },
  { name: 'Volkswagen', value: 24, color: '#e68b45' },
  { name: 'Ford', value: 19, color: '#5685a2' },
  { name: 'Chevrolet', value: 15, color: '#d4b94e' },
  { name: 'Otras', value: 11, color: '#b9c8bf' },
]

const operations = [
  { id: 'OP-2841', vehicle: 'Toyota Corolla Cross XEI', client: 'Mariana López', advisor: 'J. Méndez', date: '28 sep, 11:42', amount: '$ 38.450.000', status: 'Entregada', initials: 'ML', tone: 'green' },
  { id: 'OP-2840', vehicle: 'Volkswagen Taos Highline', client: 'Federico Ruiz', advisor: 'C. Acosta', date: '28 sep, 10:18', amount: '$ 42.800.000', status: 'Facturada', initials: 'FR', tone: 'orange' },
  { id: 'OP-2839', vehicle: 'Ford Territory Titanium', client: 'Lucía Fernández', advisor: 'A. Torres', date: '27 sep, 17:06', amount: '$ 46.200.000', status: 'En preparación', initials: 'LF', tone: 'blue' },
  { id: 'OP-2838', vehicle: 'Chevrolet Tracker Premier', client: 'Pablo Giménez', advisor: 'J. Méndez', date: '27 sep, 15:31', amount: '$ 33.900.000', status: 'Entregada', initials: 'PG', tone: 'yellow' },
]

const agingStock = [
  { model: 'Jeep Renegade Sport', detail: '2023 · Gris grafito · 1.3 T270', days: 74, price: '$ 31.800.000' },
  { model: 'Nissan Kicks Exclusive', detail: '2023 · Blanco perlado · 1.6 CVT', days: 68, price: '$ 29.450.000' },
  { model: 'Fiat Pulse Impetus', detail: '2024 · Rojo montecarlo · 1.0T', days: 61, price: '$ 27.900.000' },
]

function App() {
  const [period, setPeriod] = useState<Period>('30d')
  const [query, setQuery] = useState('')
  const summary = summaries[period]
  const visibleOperations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return operations
    return operations.filter((operation) =>
      `${operation.id} ${operation.vehicle} ${operation.client} ${operation.advisor} ${operation.status}`.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  function exportOperations() {
    const rows = [
      ['Operación', 'Vehículo', 'Cliente', 'Asesor', 'Fecha', 'Importe', 'Estado'],
      ...visibleOperations.map((operation) => [operation.id, operation.vehicle, operation.client, operation.advisor, operation.date, operation.amount, operation.status]),
    ]
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(';')).join('\n')
    const url = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'operaciones-concesionaria.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#resumen" aria-label="Autoria, ir al resumen">
          <span className="brand-mark"><CarFront size={22} strokeWidth={2.2} /></span>
          <span><strong>autoria</strong><small>GRUPO AUTOMOTOR</small></span>
        </a>
        <div className="side-caption">GESTIÓN</div>
        <nav className="side-nav" aria-label="Navegación principal">
          <a className="nav-link active" href="#resumen"><LayoutDashboard size={18} />Resumen</a>
          <a className="nav-link" href="#operaciones"><WalletCards size={18} />Operaciones</a>
          <a className="nav-link" href="#inventario"><CarFront size={18} />Inventario<span className="nav-count">126</span></a>
          <a className="nav-link" href="#analisis"><Activity size={18} />Análisis</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="branch-card"><span className="branch-dot" /><span><strong>Sucursal Palermo</strong><small>Buenos Aires, AR</small></span><ChevronDown size={15} /></div>
          <button className="profile-button" type="button" aria-label="Perfil de Martín Ríos"><span className="profile-avatar">MR</span><span><strong>Martín Ríos</strong><small>Gerente general</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <main className="main-content" id="resumen">
        <header className="topbar">
          <div className="breadcrumb"><span>Concesionaria</span><span className="crumb-divider">/</span><strong>Resumen ejecutivo</strong></div>
          <div className="topbar-actions"><span className="live-status"><span />Datos actualizados</span><button className="icon-button notification-button" type="button" aria-label="Notificaciones"><Bell size={18} /><i /></button><span className="top-avatar">MR</span></div>
        </header>

        <div className="page-wrap">
          <section className="page-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" />LUNES, 28 DE SEPTIEMBRE DE 2026</div><h1>Resumen ejecutivo</h1><p>El pulso de tu concesionaria, en un solo lugar.</p></div>
            <div className="heading-controls">
              <div className="period-switch" role="group" aria-label="Período del informe">
                {(Object.keys(periodLabels) as Period[]).map((key) => <button key={key} className={period === key ? 'selected' : ''} type="button" aria-pressed={period === key} onClick={() => setPeriod(key)}>{periodLabels[key]}</button>)}
              </div>
              <button className="export-button" type="button" onClick={exportOperations}><Download size={16} />Exportar</button>
            </div>
          </section>

          <section className="kpi-grid" aria-label={`Indicadores de los últimos ${periodLabels[period]}`}>
            <article className="kpi-card"><div className="kpi-top"><span className="kpi-icon green-icon"><CarFront size={18} /></span><span className="kpi-label">Unidades vendidas</span><button className="more-button" aria-label="Más información sobre unidades vendidas" type="button">···</button></div><div className="kpi-value">{summary.sales}<span className="kpi-unit">unid.</span></div><div className="kpi-foot"><span className="change positive"><ArrowUpRight size={14} />{summary.salesChange}</span><span>vs. período anterior</span></div></article>
            <article className="kpi-card"><div className="kpi-top"><span className="kpi-icon orange-icon"><CircleDollarSign size={18} /></span><span className="kpi-label">Facturación</span><button className="more-button" aria-label="Más información sobre facturación" type="button">···</button></div><div className="kpi-value">{summary.revenue}</div><div className="kpi-foot"><span className="change positive"><ArrowUpRight size={14} />{summary.revenueChange}</span><span>vs. período anterior</span></div></article>
            <article className="kpi-card"><div className="kpi-top"><span className="kpi-icon blue-icon"><Gauge size={18} /></span><span className="kpi-label">Margen bruto</span><button className="more-button" aria-label="Más información sobre margen bruto" type="button">···</button></div><div className="kpi-value">{summary.margin}</div><div className="kpi-foot"><span className="change positive"><ArrowUpRight size={14} />{summary.marginChange}</span><span>vs. período anterior</span></div></article>
            <article className="kpi-card"><div className="kpi-top"><span className="kpi-icon yellow-icon"><CarFront size={18} /></span><span className="kpi-label">Unidades en stock</span><button className="more-button" aria-label="Más información sobre unidades en stock" type="button">···</button></div><div className="kpi-value">{summary.stock}<span className="kpi-unit">unid.</span></div><div className="kpi-foot"><span className="change positive"><ArrowDownRight size={14} />{summary.stockChange}</span><span>vs. período anterior</span></div></article>
            <article className="kpi-card"><div className="kpi-top"><span className="kpi-icon blue-icon"><Activity size={18} /></span><span className="kpi-label">Conversión de leads</span><button className="more-button" aria-label="Más información sobre conversión de leads" type="button">···</button></div><div className="kpi-value">{summary.conversion}</div><div className="kpi-foot"><span className="change positive"><ArrowUpRight size={14} />{summary.conversionChange}</span><span>vs. período anterior</span></div></article>
            <article className="kpi-card"><div className="kpi-top"><span className="kpi-icon orange-icon"><WalletCards size={18} /></span><span className="kpi-label">Operaciones financiadas</span><button className="more-button" aria-label="Más información sobre operaciones financiadas" type="button">···</button></div><div className="kpi-value">{summary.financed}</div><div className="kpi-foot"><span className="change positive"><ArrowUpRight size={14} />{summary.financedChange}</span><span>vs. período anterior</span></div></article>
          </section>

          <section className="insight-grid" id="analisis">
            <article className="panel sales-panel">
              <div className="panel-heading"><div><div className="panel-kicker">RENDIMIENTO</div><h2>Ingresos por ventas</h2><p>Facturación neta en millones de pesos</p></div><div className="chart-legend"><span className="legend-dot revenue-dot" />Ingresos<span className="legend-dot goal-dot" />Objetivo</div></div>
              <div className="chart-summary"><strong>{summary.revenue}</strong><span className="change positive"><ArrowUpRight size={14} />{summary.revenueChange}</span></div>
              <div className="sales-chart" role="img" aria-label={`Gráfico de ingresos y objetivo para los últimos ${periodLabels[period]}`}>
                <ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData[period]} margin={{ top: 12, right: 8, left: -15, bottom: 0 }}>
                  <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#32745e" stopOpacity={0.2} /><stop offset="95%" stopColor="#32745e" stopOpacity={0.01} /></linearGradient></defs>
                  <CartesianGrid vertical={false} stroke="#e9eee9" strokeDasharray="3 5" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#89958e', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#89958e', fontSize: 11 }} tickFormatter={(value: number) => `$${value}`} />
                  <Tooltip formatter={(value) => [`$ ${Number(value).toLocaleString('es-AR')} M`, '']} contentStyle={{ border: '1px solid #e4eae5', borderRadius: 8, boxShadow: '0 8px 24px rgba(23, 42, 31, .08)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="goal" stroke="#c5cec8" strokeWidth={1.5} strokeDasharray="5 5" fill="none" name="Objetivo" />
                  <Area type="monotone" dataKey="revenue" stroke="#32745e" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 5, fill: '#32745e', stroke: '#fff', strokeWidth: 2 }} name="Ingresos" />
                </AreaChart></ResponsiveContainer>
              </div>
              <div className="chart-note"><span className="note-mark">↗</span>Mejor desempeño del período: <strong>{period === '7d' ? 'sábado' : period === '30d' ? 'semana 4' : 'septiembre'}</strong></div>
            </article>

            <article className="panel mix-panel">
              <div className="panel-heading"><div><div className="panel-kicker">PARTICIPACIÓN</div><h2>Ventas por marca</h2><p>Mix de unidades vendidas</p></div><button className="more-button" aria-label="Más opciones de ventas por marca" type="button">···</button></div>
              <div className="donut-wrap">
                <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={brandData} dataKey="value" nameKey="name" innerRadius="67%" outerRadius="91%" paddingAngle={3} stroke="none">{brandData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip formatter={(value) => [`${value}%`, 'Participación']} contentStyle={{ border: '1px solid #e4eae5', borderRadius: 8, fontSize: 12 }} /></PieChart></ResponsiveContainer>
                <div className="donut-center"><strong>42</strong><span>unidades</span></div>
              </div>
              <div className="brand-legend">{brandData.map((brand) => <div className="brand-row" key={brand.name}><span className="brand-name"><i style={{ backgroundColor: brand.color }} />{brand.name}</span><strong>{brand.value}%</strong></div>)}</div>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel operations-panel" id="operaciones">
              <div className="panel-heading operations-heading"><div><div className="panel-kicker">ACTIVIDAD COMERCIAL</div><h2>Operaciones recientes</h2><p>Últimos movimientos registrados</p></div><div className="table-actions"><label className="search-box"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar operación" aria-label="Buscar operación" /></label><button className="text-button" type="button" onClick={exportOperations}><Download size={15} /><span>Descargar</span></button></div></div>
              <div className="table-scroll"><table>
                <thead><tr><th>OPERACIÓN</th><th>CLIENTE</th><th>ASESOR</th><th>FECHA</th><th>IMPORTE</th><th>ESTADO</th></tr></thead>
                <tbody>
                  {visibleOperations.map((operation) => <tr key={operation.id}>
                    <td><div className="vehicle-cell"><span className={`vehicle-avatar ${operation.tone}`}><CarFront size={17} /></span><span><strong>{operation.vehicle}</strong><small>{operation.id}</small></span></div></td>
                    <td><div className="client-cell"><span className={`client-avatar ${operation.tone}`}>{operation.initials}</span>{operation.client}</div></td>
                    <td className="muted-cell">{operation.advisor}</td><td className="muted-cell">{operation.date}</td><td className="amount-cell">{operation.amount}</td>
                    <td><span className={`status-pill ${operation.status === 'Entregada' ? 'status-done' : operation.status === 'Facturada' ? 'status-billed' : 'status-pending'}`}><i />{operation.status}</span></td>
                  </tr>)}
                  {visibleOperations.length === 0 && <tr><td colSpan={6} className="empty-row">No hay operaciones que coincidan con “{query}”.</td></tr>}
                </tbody>
              </table></div>
              <div className="table-footer"><span>Mostrando <strong>{visibleOperations.length}</strong> de <strong>{operations.length}</strong> operaciones</span><a href="#operaciones">Ver todas <span>↗</span></a></div>
            </article>

            <article className="panel stock-panel" id="inventario">
              <div className="panel-heading stock-heading"><div><div className="panel-kicker">ATENCIÓN REQUERIDA</div><h2>Stock envejecido</h2><p>Vehículos con más de 60 días</p></div><span className="alert-count">8</span></div>
              <div className="stock-list">{agingStock.map((vehicle) => <div className="stock-row" key={vehicle.model}><span className="stock-car-icon"><CarFront size={17} /></span><div className="stock-info"><strong>{vehicle.model}</strong><small>{vehicle.detail}</small><div className="stock-meta"><span className="stock-age"><i />{vehicle.days} días en stock</span><span>{vehicle.price}</span></div></div></div>)}</div>
              <a className="stock-link" href="#inventario">Revisar inventario completo <span>↗</span></a>
            </article>
          </section>
          <footer className="page-footer"><span><ShieldCheck size={14} />Panel de gestión · Datos de demostración</span><span>Actualizado hoy, 12:04</span></footer>
        </div>
      </main>
    </div>
  )
}

export default App
