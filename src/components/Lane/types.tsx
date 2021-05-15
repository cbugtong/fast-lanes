export type Props = {
    id: string,
    title: string,
    data: { name: string }[],
    onDragStart: (lane: string, index: number) => (value: string) => void,
    onAdd: (lane: string, value: string) => void,
};

export default Props;