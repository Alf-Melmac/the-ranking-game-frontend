import axios from 'axios';

function getBackendUrl(): string {
	let hostname = window.location.hostname;
	if (import.meta.env.DEV) {
		hostname = `${hostname}:8070`;
	}
	return `${window.location.protocol}//${hostname}/api`;
}

const apiClient = axios.create({
	baseURL: getBackendUrl(),
	withCredentials: import.meta.env.DEV ? true : undefined,
	withXSRFToken: import.meta.env.DEV ? true : undefined,
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 418) {
			window.location.replace(location.origin);
		}
	},
);

export default apiClient;

export function voidFunction() {
	/*Do nothing*/
}
