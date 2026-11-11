import React, { useState, useEffect } from 'react';

// Datos iniciales de los servidores
const initialServers = [
  { id: 1, name: 'Web-Prod-01', ip: '192.168.1.10', cpu: 45, ram: 60, status: 'online' },
  { id: 2, name: 'DB-Primary', ip: '192.168.1.20', cpu: 88, ram: 92, status: 'online' },
  { id: 3, name: 'Auth-Service', ip: '192.168.1.30', cpu: 0, ram: 0, status: 'offline' },
  { id: 4, name: 'Cache-Redis', ip: '192.168.1.40', cpu: 12, ram: 35, status: 'online' }
];

//Es la estructura estándar para definir y 
//exportar el componente principal de la interfaz en una aplicación de React.
export default function App() {
  const [servers, setServers] = useState(initialServers);
  const [filter, setFilter] = useState('all'); // 'all' | 'online' | 'offline'

  // Simulación de telemetría en tiempo real (Backend polling)
  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prev =>
        prev.map(server => {
          if (server.status === 'offline') return server;
          // Variación aleatoria de CPU y RAM
          const newCpu = Math.min(100, Math.max(10, server.cpu + Math.floor(Math.random() * 11) - 5));
          const newRam = Math.min(100, Math.max(15, server.ram + Math.floor(Math.random() * 7) - 3));
          return { ...server, cpu: newCpu, ram: newRam };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Función para reiniciar/apagar un servidor
  const toggleServerStatus = (id) => {
    setServers(prev =>
      prev.map(s => {
        if (s.id === id) {
          const isOnline = s.status === 'online';
          return {
            ...s,
            status: isOnline ? 'offline' : 'online',
            cpu: isOnline ? 0 : 25,
            ram: isOnline ? 0 : 40
          };
        }
        return s;
      })
    );
  };

//Esa línea de código realiza el filtrado dinámico de los servidores para 
//decidir cuáles se deben mostrar en la pantalla según la opción seleccionada 
//por el usuario (en la barra de botones "Todos", "En línea" o "Caídos").
  const filteredServers = servers.filter(s => filter === 'all' ? true : s.status === filter);

//Este bloque de código es el encabezado visual (Header) de la aplicación en React 
//y se encarga de definir la estructura y presentación del título principal dentro de la interfaz.
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🖥️ System Metrics Monitor</h1>
        <p style={styles.subtitle}>Panel de control de infraestructura en tiempo real</p>
      </header>

      {/* Controles de Filtrado */}
      <div style={styles.filterBar}>
        <button 
          onClick={() => setFilter('all')} 
          style={{ ...styles.filterBtn, borderBottom: filter === 'all' ? '2px solid #3B82F6' : 'none' }}
        >
          Todos ({servers.length})
        </button>
        <button 
          onClick={() => setFilter('online')} 
          style={{ ...styles.filterBtn, borderBottom: filter === 'online' ? '2px solid #10B981' : 'none' }}
        >
          En línea ({servers.filter(s => s.status === 'online').length})
        </button>
        <button 
          onClick={() => setFilter('offline')} 
          style={{ ...styles.filterBtn, borderBottom: filter === 'offline' ? '2px solid #EF4444' : 'none' }}
        >
          Caídos ({servers.filter(s => s.status === 'offline').length})
        </button>
      </div>

      {/* Grid de Servidores */}
      <div style={styles.grid}>
        {filteredServers.map(server => (
          <div key={server.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.serverName}>{server.name}</h3>
                <span style={styles.ip}>{server.ip}</span>
              </div>
              <span style={{
                ...styles.badge,
                backgroundColor: server.status === 'online' ? '#D1FAE5' : '#FEE2E2',
                color: server.status === 'online' ? '#065F46' : '#991B1B'
              }}>
                {server.status.toUpperCase()}
              </span>
            </div>

            {/* Indicadores de Rendimiento */}
            <div style={styles.metrics}>
              <div>
                <div style={styles.metricLabel}>
                  <span>Uso de CPU</span>
                  <strong>{server.cpu}%</strong>
                </div>
                <div style={styles.progressBg}>
                  <div style={{
                    ...styles.progressBar,
                    width: `${server.cpu}%`,
                    backgroundColor: server.cpu > 80 ? '#EF4444' : '#3B82F6'
                  }} />
                </div>
              </div>

{/* Este bloque de código construye la barra de estado dinámica para el uso de Memoria RAM 
de cada servidor. Combina HTML visual, renderizado de datos dinámicos y estilos CSS condicionales. */}

              <div>
                <div style={styles.metricLabel}>
                  <span>Memoria RAM</span>
                  <strong>{server.ram}%</strong>
                </div>
                <div style={styles.progressBg}>
                  <div style={{
                    ...styles.progressBar,
                    width: `${server.ram}%`,
                    backgroundColor: server.ram > 85 ? '#F59E0B' : '#8B5CF6'
                  }} />
                </div>
              </div>
            </div>

            {/* Acción de control */}
            <button 
              onClick={() => toggleServerStatus(server.id)}
              style={{
                ...styles.actionBtn,
                backgroundColor: server.status === 'online' ? '#EF4444' : '#10B981'
              }}
            >
              {server.status === 'online' ? 'Apagar Servidor' : 'Iniciar Servidor'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px', fontFamily: 'monospace, sans-serif', backgroundColor: '#0F172A', minHeight: '100vh', color: '#F8FAFC' },
  header: { marginBottom: '24px' },
  title: { margin: 0, fontSize: '24px', color: '#60A5FA' },
  subtitle: { margin: '4px 0 0 0', color: '#94A3B8', fontSize: '14px' },
  filterBar: { display: 'flex', gap: '16px', marginBottom: '20px', borderBottom: '1px solid #334155' },
  filterBtn: { background: 'none', border: 'none', color: '#F8FAFC', padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#1E293B', borderRadius: '12px', padding: '16px', border: '1px solid #334155' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  serverName: { margin: 0, fontSize: '16px', color: '#F1F5F9' },
  ip: { fontSize: '12px', color: '#64748B' },
  badge: { fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px' },
  metrics: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' },
  metricLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' },
  progressBg: { backgroundColor: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden' },
  progressBar: { height: '100%', transition: 'width 0.5s ease' },
  actionBtn: { width: '100%', border: 'none', color: '#FFF', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }
};