import React, { useState } from 'react';
import { 
  UserCheck, DollarSign, Calendar, Sparkles, Clock, LogOut, 
  Edit3, Plus, Trash2, User, Users, ShieldAlert, Scissors, Briefcase, FolderHeart
} from 'lucide-react';

export default function Dashboard() {
  // --- BANCO DE DADOS DINÂMICO EM MEMÓRIA ---
  const [usersDatabase, setUsersDatabase] = useState([
    { email: 'clara@lumiere.com', nome: 'Clara Soares', role: 'recepcionista', telefone: '(11) 91234-5678', cpf: '000.111.222-33' },
    { email: 'helene@gmail.com', nome: 'Hélène Vance', role: 'paciente', telefone: '(11) 98888-7777', cpf: '123.456.789-00' },
    { email: 'jean@gmail.com', nome: 'Jean-Louis Dupont', role: 'paciente', telefone: '(11) 97777-6666', cpf: '987.654.321-11' }
  ]);

  const [patients, setPatients] = useState([
    { id: 1, nome: 'Hélène Vance', email: 'helene@gmail.com', telefone: '(11) 98888-7777', cpf: '123.456.789-00' },
    { id: 2, nome: 'Jean-Louis Dupont', email: 'jean@gmail.com', telefone: '(11) 97777-6666', cpf: '987.654.321-11' }
  ]);

  // Carregado com +3 médicos (Total: 5)
  const [doctors, setDoctors] = useState([
    { id: 1, nome: 'Dra. Morgana LeFey', categoria: 'Dermatologia Estética' },
    { id: 2, nome: 'Dr. Pierre Bouvier', categoria: 'Cirurgia Plástica & Botox' },
    { id: 3, nome: 'Dr. Jean-Luc Godard', categoria: 'Harmonização Facial' },
    { id: 4, nome: 'Dra. Amélie Poulain', categoria: 'Cosmiatria Avançada' },
    { id: 5, nome: 'Dr. Charles de Gaulle', categoria: 'Tricologia & Implante Capilar' }
  ]);

  // Carregado com +5 serviços de alto padrão (Total: 7)
  const [services, setServices] = useState([
    { id: 1, nome: 'Peeling de Diamante Premium', categoria: 'Estética Facial', preco: 'R$ 450,00' },
    { id: 2, nome: 'Aplicação de Toxina Botulínica', categoria: 'Injetáveis', preco: 'R$ 1.800,00' },
    { id: 3, nome: 'Preenchimento com Ácido Hialurônico', categoria: 'Injetáveis', preco: 'R$ 2.200,00' },
    { id: 4, nome: 'Protocolo Capilar Anti-Queda', categoria: 'Tricologia', preco: 'R$ 850,00' },
    { id: 5, nome: 'Laser de CO2 Fracionado', categoria: 'Tecnologias', preco: 'R$ 1.500,00' },
    { id: 6, nome: 'Bioestimulador de Colágeno (Sculptra)', categoria: 'Injetáveis', preco: 'R$ 2.900,00' },
    { id: 7, nome: 'Limpeza de Pele Lumière Confort', categoria: 'Estética Facial', preco: 'R$ 350,00' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, horario: '14:00', paciente: 'Hélène Vance', procedimento: 'Peeling de Diamante Premium', especialista: 'Dra. Morgana LeFey', status: 'Confirmado' },
    { id: 2, horario: '15:30', paciente: 'Jean-Louis Dupont', procedimento: 'Aplicação de Toxina Botulínica', especialista: 'Dr. Pierre Bouvier', status: 'Agendado' }
  ]);

  // --- ESTADOS DE AUTENTICAÇÃO ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loginTab, setLoginTab] = useState<'login' | 'cadastro'>('login');
  
  // Formulários de Autenticação
  const [loginEmail, setLoginEmail] = useState('');
  const [registerForm, setRegisterForm] = useState({ nome: '', email: '', telefone: '', cpf: '', role: 'paciente' });
  const [authError, setAuthError] = useState('');

  // --- NAVEGAÇÃO DO MENU ---
  const [activeMenu, setActiveMenu] = useState<string>('');

  // --- ESTADOS DE EDIÇÃO / CRIAÇÃO ---
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Formulários Dinâmicos de Entrada (Modais e Paineis)
  const [formPatient, setFormPatient] = useState({ nome: '', email: '', telefone: '', cpf: '' });
  const [formDoctor, setFormDoctor] = useState({ nome: '', categoria: '' });
  const [formService, setFormService] = useState({ nome: '', categoria: '', preco: '' });
  const [formAppointment, setFormAppointment] = useState({ horario: '09:00', paciente: '', procedimento: '', especialista: '', status: 'Agendado' });

  // --- CONTROLE DE LOGIN E CADASTRO ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = usersDatabase.find(u => u.email.toLowerCase() === loginEmail.toLowerCase().trim());
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setAuthError('');
      setActiveMenu(user.role === 'recepcionista' ? 'consultas' : 'consultas-agendadas');
    } else {
      setAuthError('E-mail não encontrado no sistema.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existe = usersDatabase.some(u => u.email.toLowerCase() === registerForm.email.toLowerCase().trim());
    if (existe) {
      setAuthError('Este e-mail já está cadastrado.');
      return;
    }

    const novoUsuario = {
      email: registerForm.email.toLowerCase().trim(),
      nome: registerForm.nome,
      telefone: registerForm.telefone,
      cpf: registerForm.cpf,
      role: registerForm.role
    };

    setUsersDatabase([...usersDatabase, novoUsuario]);
    
    // Insere na lista geral de pacientes se o cadastro for do perfil paciente
    if (registerForm.role === 'paciente') {
      setPatients([...patients, { 
        id: Date.now(), 
        nome: registerForm.nome, 
        email: registerForm.email, 
        telefone: registerForm.telefone, 
        cpf: registerForm.cpf 
      }]);
    }

    setCurrentUser(novoUsuario);
    setIsAuthenticated(true);
    setAuthError('');
    setActiveMenu(novoUsuario.role === 'recepcionista' ? 'consultas' : 'consultas-agendadas');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginEmail('');
    setRegisterForm({ nome: '', email: '', telefone: '', cpf: '', role: 'paciente' });
  };

  // ==========================================
  // 1️⃣ TELA DE LOGIN & CADASTRO (ATUALIZADA COM TELEFONE E CPF)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-6 font-sans">
        <div className="bg-white border border-[#D4AF37]/30 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-light tracking-widest uppercase text-[#111111] mb-2">Lumière Clinic</h1>
          <p className="text-xs tracking-widest text-[#D4AF37] italic font-serif mb-6">Portal de Autenticação Executiva</p>
          
          <div className="flex border-b border-gray-100 mb-6">
            <button 
              onClick={() => { setLoginTab('login'); setAuthError(''); }}
              className={`w-1/2 pb-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${loginTab === 'login' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => { setLoginTab('cadastro'); setAuthError(''); }}
              className={`w-1/2 pb-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${loginTab === 'cadastro' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}
            >
              Cadastrar-se
            </button>
          </div>

          {/* FORMULÁRIO: ENTRAR */}
          {loginTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">E-mail Registrado</label>
                <input 
                  type="email" required placeholder="Digite seu e-mail" value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl p-3 text-sm bg-[#FDFBF7]"
                />
              </div>
              {authError && <p className="text-xs text-red-600 bg-red-50 p-2 rounded font-medium flex items-center gap-1"><ShieldAlert size={12}/>{authError}</p>}
              <button type="submit" className="w-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all p-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold">Acessar Painel</button>
            </form>
          )}

          {/* FORMULÁRIO: CADASTRAR-SE (CAMPOS CPF E TELEFONE ADICIONADOS) */}
          {loginTab === 'cadastro' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Nome Completo</label>
                <input 
                  type="text" required placeholder="Ex: Hélène Vance" value={registerForm.nome}
                  onChange={(e) => setRegisterForm({...registerForm, nome: e.target.value})}
                  className="w-full border border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl p-3 text-sm bg-[#FDFBF7]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">E-mail</label>
                <input 
                  type="email" required placeholder="seu@email.com" value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full border border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl p-3 text-sm bg-[#FDFBF7]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Telefone</label>
                  <input 
                    type="text" required placeholder="(11) 99999-9999" value={registerForm.telefone}
                    onChange={(e) => setRegisterForm({...registerForm, telefone: e.target.value})}
                    className="w-full border border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl p-3 text-sm bg-[#FDFBF7]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">CPF</label>
                  <input 
                    type="text" required placeholder="123.456.789-00" value={registerForm.cpf}
                    onChange={(e) => setRegisterForm({...registerForm, cpf: e.target.value})}
                    className="w-full border border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl p-3 text-sm bg-[#FDFBF7]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Tipo de Perfil</label>
                <select 
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                  className="w-full border border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl p-3 text-sm bg-[#FDFBF7]"
                >
                  <option value="paciente">Paciente (Visualizar Agendamentos)</option>
                  <option value="recepcionista">Recepcionista (Acesso Total Administrativo)</option>
                </select>
              </div>
              {authError && <p className="text-xs text-red-600 bg-red-50 p-2 rounded font-medium flex items-center gap-1"><ShieldAlert size={12}/>{authError}</p>}
              <button type="submit" className="w-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111] transition-all p-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold">Criar Conta & Entrar</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // 2️⃣ CORE DO DASHBOARD PRINCIPAL
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10 text-[#111111] font-sans">
      
      {/* Top Header */}
      <header className="border-b border-[#D4AF37]/30 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-light tracking-widest uppercase">Lumière Clinic</h1>
          <p className="text-xs tracking-widest text-[#D4AF37] italic font-serif mt-1">Bonjour, {currentUser?.nome}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-[#D4AF37] px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-[#D4AF37] bg-white">
            <Sparkles size={14} className="animate-pulse" />
            Perfil: {currentUser?.role}
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition-colors" title="Sair"><LogOut size={20} /></button>
        </div>
      </header>

      {/* MENUS DINÂMICOS */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-8">
        {currentUser?.role === 'recepcionista' && (
          <>
            <button onClick={() => { setActiveMenu('pacientes'); setIsAdding(false); setEditingId(null); }} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'pacientes' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><Users size={14} /> Pacientes</button>
            <button onClick={() => { setActiveMenu('profissionais'); setIsAdding(false); setEditingId(null); }} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'profissionais' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><Briefcase size={14} /> Profissionais (Médicos)</button>
            <button onClick={() => { setActiveMenu('servicos'); setIsAdding(false); setEditingId(null); }} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'servicos' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><Scissors size={14} /> Serviços</button>
            <button onClick={() => { setActiveMenu('consultas'); setIsAdding(false); setEditingId(null); }} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'consultas' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><Calendar size={14} /> Consultas</button>
            <button onClick={() => { setActiveMenu('perfil'); }} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'perfil' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><User size={14} /> Perfil</button>
          </>
        )}
        {currentUser?.role === 'paciente' && (
          <>
            <button onClick={() => setActiveMenu('consultas-agendadas')} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'consultas-agendadas' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><Clock size={14} /> Consultas Agendadas</button>
            <button onClick={() => setActiveMenu('perfil-paciente')} className={`pb-4 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 flex items-center gap-1.5 ${activeMenu === 'perfil-paciente' ? 'border-[#D4AF37] text-[#111111]' : 'border-transparent text-gray-400'}`}><User size={14} /> Perfil</button>
          </>
        )}
      </div>

      {/* ==========================================
          CONTEÚDO DAS ABAS (ADMINISTRATIVO)
         ========================================== */}

      {/* 📁 RECEPCIONISTA -> ABA: PACIENTES */}
      {currentUser?.role === 'recepcionista' && activeMenu === 'pacientes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#D4AF37]/20 rounded-xl">
            <span className="text-xs uppercase tracking-wider text-gray-500">Gerenciamento Base de Clientes</span>
            <button onClick={() => setIsAdding(!isAdding)} className="bg-[#111111] text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-[#D4AF37] hover:text-[#111111]"><Plus size={14}/> Novo Paciente</button>
          </div>

          {isAdding && (
            <form onSubmit={(e) => { e.preventDefault(); setPatients([...patients, { id: Date.now(), ...formPatient }]); setIsAdding(false); setFormPatient({ nome: '', email: '', telefone: '', cpf: '' }); }} className="bg-white border border-[#D4AF37]/40 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Nome</label><input type="text" required value={formPatient.nome} onChange={e => setFormPatient({...formPatient, nome: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">E-mail</label><input type="email" required value={formPatient.email} onChange={e => setFormPatient({...formPatient, email: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Telefone</label><input type="text" required value={formPatient.telefone} onChange={e => setFormPatient({...formPatient, telefone: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">CPF</label><input type="text" required value={formPatient.cpf} onChange={e => setFormPatient({...formPatient, cpf: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm"/></div>
              <button type="submit" className="bg-emerald-600 text-white text-xs p-2.5 rounded font-bold uppercase tracking-wider md:col-span-4">Confirmar Cadastro</button>
            </form>
          )}

          <div className="bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400"><th className="p-4">Nome</th><th className="p-4">E-mail</th><th className="p-4">Telefone</th><th className="p-4">CPF</th><th className="p-4 text-right">Ações</th></tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {patients.map(p => (
                  <tr key={p.id} className="hover:bg-[#FDFBF7]/40">
                    <td className="p-4 font-medium">
                      {editingId === p.id ? <input type="text" value={p.nome} onChange={e => setPatients(patients.map(item => item.id === p.id ? {...item, nome: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : p.nome}
                    </td>
                    <td className="p-4 text-gray-600">
                      {editingId === p.id ? <input type="email" value={p.email} onChange={e => setPatients(patients.map(item => item.id === p.id ? {...item, email: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : p.email}
                    </td>
                    <td className="p-4 text-gray-500">
                      {editingId === p.id ? <input type="text" value={p.telefone} onChange={e => setPatients(patients.map(item => item.id === p.id ? {...item, telefone: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : p.telefone}
                    </td>
                    <td className="p-4 text-gray-500 font-mono">
                      {editingId === p.id ? <input type="text" value={p.cpf} onChange={e => setPatients(patients.map(item => item.id === p.id ? {...item, cpf: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : p.cpf}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      {editingId === p.id ? <button onClick={() => setEditingId(null)} className="text-emerald-600 text-xs font-bold uppercase">OK</button> : <button onClick={() => setEditingId(p.id)} className="text-gray-400 hover:text-[#D4AF37]"><Edit3 size={14}/></button>}
                      <button onClick={() => setPatients(patients.filter(item => item.id !== p.id))} className="text-gray-300 hover:text-red-600"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📁 RECEPCIONISTA -> ABA: PROFISSIONAIS / MÉDICOS */}
      {currentUser?.role === 'recepcionista' && activeMenu === 'profissionais' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#D4AF37]/20 rounded-xl">
            <span className="text-xs uppercase tracking-wider text-gray-500">Corpo Clínico (Médicos Ativos)</span>
            <button onClick={() => setIsAdding(!isAdding)} className="bg-[#111111] text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-[#D4AF37] hover:text-[#111111]"><Plus size={14}/> Novo Médico</button>
          </div>

          {isAdding && (
            <form onSubmit={(e) => { e.preventDefault(); setDoctors([...doctors, { id: Date.now(), ...formDoctor }]); setIsAdding(false); setFormDoctor({ nome: '', categoria: '' }); }} className="bg-white border border-[#D4AF37]/40 p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Nome do Especialista</label><input type="text" required value={formDoctor.nome} onChange={e => setFormDoctor({...formDoctor, nome: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm" placeholder="Ex: Dra. Ana Sofia"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Categoria / Especialidade</label><input type="text" required value={formDoctor.categoria} onChange={e => setFormDoctor({...formDoctor, categoria: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm" placeholder="Ex: Laserterapia"/></div>
              <button type="submit" className="bg-emerald-600 text-white text-xs p-2.5 rounded font-bold uppercase tracking-wider md:col-span-2">Adicionar Médico</button>
            </form>
          )}

          <div className="bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400"><th className="p-4">Médicos Registrados</th><th className="p-4">Categoria / Especialidade</th><th className="p-4 text-right">Ações</th></tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {doctors.map(d => (
                  <tr key={d.id} className="hover:bg-[#FDFBF7]/40">
                    <td className="p-4 font-medium">
                      {editingId === d.id ? <input type="text" value={d.nome} onChange={e => setDoctors(doctors.map(item => item.id === d.id ? {...item, nome: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : d.nome}
                    </td>
                    <td className="p-4">
                      {editingId === d.id ? <input type="text" value={d.categoria} onChange={e => setDoctors(doctors.map(item => item.id === d.id ? {...item, categoria: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-medium">{d.categoria}</span>}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      {editingId === d.id ? <button onClick={() => setEditingId(null)} className="text-emerald-600 text-xs font-bold uppercase">Salvar</button> : <button onClick={() => setEditingId(d.id)} className="text-gray-400 hover:text-[#D4AF37]"><Edit3 size={14}/></button>}
                      <button onClick={() => setDoctors(doctors.filter(item => item.id !== d.id))} className="text-gray-300 hover:text-red-600"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📁 RECEPCIONISTA -> ABA: SERVIÇOS */}
      {currentUser?.role === 'recepcionista' && activeMenu === 'servicos' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#D4AF37]/20 rounded-xl">
            <span className="text-xs uppercase tracking-wider text-gray-500">Catálogo Premium de Serviços</span>
            <button onClick={() => setIsAdding(!isAdding)} className="bg-[#111111] text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-[#D4AF37] hover:text-[#111111]"><Plus size={14}/> Novo Serviço</button>
          </div>

          {isAdding && (
            <form onSubmit={(e) => { e.preventDefault(); setServices([...services, { id: Date.now(), ...formService }]); setIsAdding(false); setFormService({ nome: '', categoria: '', preco: '' }); }} className="bg-white border border-[#D4AF37]/40 p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Nome do Procedimento</label><input type="text" required value={formService.nome} onChange={e => setFormService({...formService, nome: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Categoria</label><input type="text" required value={formService.categoria} onChange={e => setFormService({...formService, categoria: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Preço Executivo</label><input type="text" required value={formService.preco} onChange={e => setFormService({...formService, preco: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm" placeholder="Ex: R$ 600,00"/></div>
              <button type="submit" className="bg-emerald-600 text-white text-xs p-2.5 rounded font-bold uppercase tracking-wider md:col-span-3">Adicionar ao Catálogo</button>
            </form>
          )}

          <div className="bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400"><th className="p-4">Procedimento</th><th className="p-4">Categoria</th><th className="p-4">Preço Executivo</th><th className="p-4 text-right">Ações</th></tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-[#FDFBF7]/40">
                    <td className="p-4 font-medium">
                      {editingId === s.id ? <input type="text" value={s.nome} onChange={e => setServices(services.map(item => item.id === s.id ? {...item, nome: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : s.nome}
                    </td>
                    <td className="p-4 text-gray-500">
                      {editingId === s.id ? <input type="text" value={s.categoria} onChange={e => setServices(services.map(item => item.id === s.id ? {...item, categoria: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : s.categoria}
                    </td>
                    <td className="p-4 font-mono text-[#D4AF37]">
                      {editingId === s.id ? <input type="text" value={s.preco} onChange={e => setServices(services.map(item => item.id === s.id ? {...item, preco: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 text-xs"/> : s.preco}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      {editingId === s.id ? <button onClick={() => setEditingId(null)} className="text-emerald-600 text-xs font-bold uppercase">OK</button> : <button onClick={() => setEditingId(s.id)} className="text-gray-400 hover:text-[#D4AF37]"><Edit3 size={14}/></button>}
                      <button onClick={() => setServices(services.filter(item => item.id !== s.id))} className="text-gray-300 hover:text-red-600"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📁 RECEPCIONISTA -> ABA: CONSULTAS */}
      {currentUser?.role === 'recepcionista' && activeMenu === 'consultas' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 border border-[#D4AF37]/20 rounded-xl shadow-sm">
            <span className="text-xs uppercase tracking-wider text-gray-500">Módulo Central de Agendamentos</span>
            <button onClick={() => setIsAdding(!isAdding)} className="bg-[#111111] text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-[#D4AF37] hover:text-[#111111]"><Plus size={14}/> Nova Consulta</button>
          </div>

          {isAdding && (
            <form onSubmit={(e) => { e.preventDefault(); setAppointments([...appointments, { id: Date.now(), ...formAppointment }]); setIsAdding(false); }} className="bg-white border border-[#D4AF37]/40 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Horário</label><input type="text" required value={formAppointment.horario} onChange={e => setFormAppointment({...formAppointment, horario: e.target.value})} className="w-full border border-gray-200 rounded p-2 text-sm" placeholder="Ex: 16:00"/></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Paciente</label><select required className="w-full border border-gray-200 rounded p-2 text-sm bg-white" onChange={e => setFormAppointment({...formAppointment, paciente: e.target.value})}><option value="">Selecione...</option>{patients.map(p => <option key={p.id} value={p.nome}>{p.nome}</option>)}</select></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Procedimento</label><select required className="w-full border border-gray-200 rounded p-2 text-sm bg-white" onChange={e => setFormAppointment({...formAppointment, procedimento: e.target.value})}><option value="">Selecione...</option>{services.map(s => <option key={s.id} value={s.nome}>{s.nome}</option>)}</select></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-400">Médico Especialista</label><select required className="w-full border border-gray-200 rounded p-2 text-sm bg-white" onChange={e => setFormAppointment({...formAppointment, especialista: e.target.value})}><option value="">Selecione...</option>{doctors.map(d => <option key={d.id} value={d.nome}>{d.nome}</option>)}</select></div>
              <button type="submit" className="bg-emerald-600 text-white text-xs p-2.5 rounded font-bold uppercase tracking-wider md:col-span-4">Salvar Consulta na Agenda</button>
            </form>
          )}

          <div className="bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400"><th className="p-4">Horário</th><th className="p-4">Paciente</th><th className="p-4">Procedimento</th><th className="p-4">Especialista</th><th className="p-4 text-right">Ações</th></tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {appointments.map(app => (
                  <tr key={app.id} className="hover:bg-[#FDFBF7]/40">
                    <td className="p-4 font-medium text-[#D4AF37]">
                      {editingId === app.id ? <input type="text" value={app.horario} onChange={e => setAppointments(appointments.map(item => item.id === app.id ? {...item, horario: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 w-20 text-xs"/> : app.horario}
                    </td>
                    <td className="p-4 font-medium">{app.paciente}</td>
                    <td className="p-4 text-gray-600 italic">
                      {editingId === app.id ? <input type="text" value={app.procedimento} onChange={e => setAppointments(appointments.map(item => item.id === app.id ? {...item, procedimento: e.target.value} : item))} className="border border-[#D4AF37] rounded p-1 w-full text-xs"/> : app.procedimento}
                    </td>
                    <td className="p-4 text-gray-500">{app.especialista}</td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      {editingId === app.id ? <button onClick={() => setEditingId(null)} className="text-emerald-600 text-xs font-bold uppercase">OK</button> : <button onClick={() => setEditingId(app.id)} className="text-gray-400 hover:text-[#D4AF37]"><Edit3 size={12}/></button>}
                      <button onClick={() => setAppointments(appointments.filter(item => item.id !== app.id))} className="text-gray-300 hover:text-red-600"><Trash2 size={12}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECEPCIONISTA -> PERFIL */}
      {currentUser?.role === 'recepcionista' && activeMenu === 'perfil' && (
        <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-xl max-w-md shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#D4AF37]">Conta Administradora</h3>
          <p className="text-xs text-gray-500 uppercase font-mono mb-1">Nome: <span className="text-gray-800 font-sans font-medium">{currentUser.nome}</span></p>
          <p className="text-xs text-gray-500 uppercase font-mono mb-1">E-mail: <span className="text-gray-800 font-sans font-medium">{currentUser.email}</span></p>
          <p className="text-xs text-gray-500 uppercase font-mono mb-1">Telefone: <span className="text-gray-800 font-sans font-medium">{currentUser.telefone}</span></p>
          <p className="text-xs text-gray-500 uppercase font-mono">CPF: <span className="text-gray-800 font-sans font-medium">{currentUser.cpf}</span></p>
        </div>
      )}

      {/* ==========================================
          👤 PAINEL EXCLUSIVO DO PACIENTE
         ========================================== */}
      {currentUser?.role === 'paciente' && activeMenu === 'consultas-agendadas' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#D4AF37]/20 p-5 rounded-xl">
            <h2 className="text-lg font-light uppercase tracking-widest">Suas Próximas Consultas</h2>
            <p className="text-xs text-gray-400 mt-1">Horários agendados e confirmados pela equipe médica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointments.filter(a => a.paciente.toLowerCase() === currentUser.nome.toLowerCase()).map(myApp => (
              <div key={myApp.id} className="bg-[#111111] text-white border border-[#D4AF37]/30 p-6 rounded-xl relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#D4AF37] text-[#111111] px-3 py-1 rounded-full text-xs font-bold tracking-widest flex items-center gap-1"><Clock size={12}/> {myApp.horario}</span>
                  <span className="text-xs text-[#D4AF37] uppercase font-semibold border border-[#D4AF37]/20 bg-white/5 px-2.5 py-0.5 rounded">{myApp.status}</span>
                </div>
                <h4 className="text-xl font-light tracking-wide text-[#D4AF37] mb-1">{myApp.procedimento}</h4>
                <p className="text-xs text-gray-400 tracking-wider uppercase">Profissional: {myApp.especialista}</p>
              </div>
            ))}
            {appointments.filter(a => a.paciente.toLowerCase() === currentUser.nome.toLowerCase()).length === 0 && (
              <div className="col-span-2 bg-white border border-dashed border-gray-200 p-8 rounded-xl text-center text-gray-400 text-xs uppercase tracking-widest">Nenhum procedimento agendado para o seu perfil.</div>
            )}
          </div>
        </div>
      )}

      {currentUser?.role === 'paciente' && activeMenu === 'perfil-paciente' && (
        <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-xl max-w-md shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37]"><FolderHeart size={20}/></div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Histórico de Membro Privé</h3>
          </div>
          <div className="space-y-2 text-xs border-t border-gray-100 pt-4 font-mono text-gray-500">
            <p>NOME: <span className="text-gray-800 font-sans font-medium">{currentUser.nome}</span></p>
            <p>E-MAIL: <span className="text-gray-800 font-sans font-medium">{currentUser.email}</span></p>
            <p>TELEFONE: <span className="text-gray-800 font-sans font-medium">{currentUser.telefone}</span></p>
            <p>CPF: <span className="text-gray-800 font-sans font-medium">{currentUser.cpf}</span></p>
          </div>
        </div>
      )}

    </div>
  );
}