export type RemoveUndefined<T> = {
	[P in keyof T]-?: Exclude<T[P], undefined>;
};
