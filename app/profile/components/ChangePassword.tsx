export default function ProfilePhoto({ user, setUser }: any) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center text-2xl">
        {user.name[0]}
      </div>
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-white/60">{user.email}</p>
      </div>
    </div>
  );
}
