import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { category: string; control: number; phellinus: number }[];
}

export default function ResearchChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis dataKey="category" stroke="#bbb" tick={{ fontSize: 11, fontWeight: 'bold' }} />
        <YAxis stroke="#bbb" tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '14px', color: '#fff' }} />
        <Bar dataKey="control" name="Control" fill="#333" radius={[6, 6, 0, 0]} barSize={45} />
        <Bar dataKey="phellinus" name="Vital Core" fill="#d97706" radius={[6, 6, 0, 0]} barSize={45} />
      </BarChart>
    </ResponsiveContainer>
  );
}
