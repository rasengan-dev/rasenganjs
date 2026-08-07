import { PageComponent } from 'rasengan';
import { useEffect, useState } from 'react';
import { api, RequestError, type User } from '@/lib/api';
import { HealthBadge } from '@/components/HealthBadge';
import { AddUserForm } from '@/components/AddUserForm';
import { UserCard } from '@/components/UserCard';
import { UserDetailModal } from '@/components/UserDetailModal';
import { ToastProvider, useToast } from '@/lib/toast';

function Registry() {
  const toast = useToast();
  const [users, setUsers] = useState<User[] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    api
      .listUsers()
      .then(setUsers)
      .catch(() => {
        setUsers([]);
        toast('error', 'Could not reach /api/users');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (name: string) => {
    try {
      const user = await api.createUser(name);
      setUsers((prev) => [...(prev ?? []), user]);
      toast('success', `${user.name} enlisted`);
    } catch (err) {
      toast(
        'error',
        err instanceof RequestError ? err.message : 'Enlisting failed'
      );
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const user = users?.find((u) => u.id === id);
    try {
      await api.deleteUser(id);
      setUsers((prev) => (prev ?? []).filter((u) => u.id !== id));
      toast('success', `${user?.name ?? 'Shinobi'} removed from the roster`);
    } catch (err) {
      toast(
        'error',
        err instanceof RequestError ? err.message : 'Removal failed'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleUnknownLookup = async () => {
    try {
      await api.getUser('404');
    } catch (err) {
      toast(
        'error',
        err instanceof RequestError
          ? `${err.status} — ${err.message}`
          : 'Something broke'
      );
    }
  };

  return (
    <>
      <div className="page">
        <div className="blob blob--a" aria-hidden="true" />
        <div className="blob blob--b" aria-hidden="true" />

        <header className="hero">
          <p className="hero__eyebrow">RFC-0008 · src/app/_api/ demo</p>
          <h1 className="hero__title">Shinobi Registry</h1>
          <p className="hero__subtitle">
            A soft little admin panel talking straight to a file-based{' '}
            <code>_api/</code> route tree — no separate backend, just{' '}
            <code>*.route.ts</code> files.
          </p>
          <HealthBadge />
        </header>

        <main className="layout">
          <AddUserForm onSubmit={handleCreate} />

          <section className="roster">
            <div className="roster__header">
              <div>
                <p className="roster__eyebrow">GET /api/users</p>
                <h2 className="roster__title">
                  Roster
                  {users && (
                    <span className="roster__count">{users.length}</span>
                  )}
                </h2>
              </div>
              <button className="btn btn--ghost" onClick={handleUnknownLookup}>
                Look up unknown id
              </button>
            </div>

            {users === null && (
              <ul className="user-grid">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="user-card user-card--skeleton" />
                ))}
              </ul>
            )}

            {users !== null && users.length === 0 && (
              <div className="empty-state">
                <p>No shinobi enlisted yet.</p>
                <p className="empty-state__hint">
                  Add one on the left to see the roster fill in.
                </p>
              </div>
            )}

            {users !== null && users.length > 0 && (
              <ul className="user-grid">
                {users.map((user, index) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    index={index}
                    onOpen={setOpenId}
                    onDelete={handleDelete}
                    deleting={deletingId === user.id}
                  />
                ))}
              </ul>
            )}
          </section>
        </main>

        <footer className="foot-note">
          <span>Guarded by an x-api-key middleware.ts on /api/users/*</span>
          <span aria-hidden="true">·</span>
          <span>proposals/RFC-0008-Api-Routes.md</span>
        </footer>
      </div>

      {openId && (
        <UserDetailModal id={openId} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}

const Home: PageComponent = () => {
  return (
    <ToastProvider>
      <Registry />
    </ToastProvider>
  );
};

Home.metadata = {
  title: 'Shinobi Registry',
  description: 'RFC-0008 _api/ routes playground',
};

export default Home;
