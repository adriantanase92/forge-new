import type { HttpMethod } from '@sveltejs/kit';
import type { Modules } from '.';

type RawData = Record<string, unknown>;
type FetchFunctionType = typeof fetch;
type Headers = Record<string, string>;

type ApiOptionsParams = {
	fetch?: FetchFunctionType;
	url: string;
	method?: HttpMethod;
	headers?: Headers;
	data?: RawData;
};

const apiHeaders = (additionalHeaders: Headers | undefined): Headers => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	};

	return additionalHeaders ? { ...defaultHeaders, ...additionalHeaders } : defaultHeaders;
};

export const api = async (options: ApiOptionsParams) => {
	const fetchMethod = options.fetch || fetch;
	try {
		const response = await fetchMethod(options.url, {
			method: options.method || 'GET',
			headers: apiHeaders(options.headers),
			body: options.data && options.method !== 'GET' ? JSON.stringify(options.data) : null
		});
		return await response.json();
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new Error(err.message, { cause: err });
		} else {
			throw new Error('Unhandled error type', { cause: err });
		}
	}
};

type PopulateInfo = {
	field: string;
	collectionName: Modules;
};

type QueryString = {
	search?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	filters?: { field: string; value: string }[];
	page?: string;
	limit?: string;
	excludeFields?: string[];
	populate?: PopulateInfo[];
};

type HttpOptionsParams = {
	fetch?: FetchFunctionType;
	apiUrl: string;
	errorKey: string;
};

export const getAll = async ({
	fetch,
	apiUrl,
	requestQuery = {},
	errorKey
}: HttpOptionsParams & {
	requestQuery?: QueryString;
}) => {
	try {
		const { search, sortBy, sortOrder, filters, page, limit, excludeFields, populate } =
			requestQuery;

		// Initialize an array to hold query parameters
		const queryParams: string[] = [];

		// Check each query parameter and add it to the array if it exists
		if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
		if (sortBy) queryParams.push(`sortBy=${encodeURIComponent(sortBy)}`);
		if (sortOrder) queryParams.push(`sortOrder=${sortOrder}`);
		if (page) queryParams.push(`page=${page}`);
		if (limit) queryParams.push(`limit=${limit}`);
		if (excludeFields) queryParams.push(`excludeFields=${excludeFields.join(',')}`);

		if (filters && filters.length > 0) {
			// Prefix each filter with 'filter_'
			filters.forEach((filter) => {
				if (filter?.field && filter?.value) {
					queryParams.push(`filter_${filter.field}=${encodeURIComponent(filter.value)}`);
				}
			});
		}

		if (populate && populate.length > 0) {
			// Prefix each populate with 'populate_'
			populate.forEach((populateInfo) => {
				if (populateInfo?.field && populateInfo?.collectionName) {
					queryParams.push(
						`populate_${populateInfo.field}=${encodeURIComponent(
							populateInfo.collectionName
						)}`
					);
				}
			});
		}

		// Construct the full URL with query parameters
		const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

		const response = await api({
			fetch,
			url: `${apiUrl}${queryString}`
		});

		return { data: response.data };
	} catch (e) {
		return { error: { errorKey, error: e } };
	}
};

export const getOne = async ({
	fetch,
	apiUrl,
	id,
	populate = [],
	errorKey
}: HttpOptionsParams & {
	id: string;
	populate?: PopulateInfo[];
}) => {
	try {
		let url = `${apiUrl}/${id}`;

		// If populate instructions are provided, add them as query parameters
		if (populate.length > 0) {
			const populateQueries = populate
				.map((p) => `populate_${p.field}=${encodeURIComponent(p.collectionName)}`)
				.join('&');
			url += `?${populateQueries}`;
		}

		const response = await api({
			fetch,
			url
		});

		return { data: response.data };
	} catch (e) {
		return { error: { errorKey, error: e } };
	}
};

export const createOne = async <T>({
	fetch,
	apiUrl,
	errorKey,
	data
}: HttpOptionsParams & {
	data: T;
}) => {
	try {
		const response = await api({
			fetch,
			method: 'POST',
			url: apiUrl,
			data: data as RawData
		});

		return { data: response.data };
	} catch (e) {
		return { error: { errorKey, error: e } };
	}
};

export const updateOne = async <T>({
	fetch,
	apiUrl,
	errorKey,
	data,
	id
}: HttpOptionsParams & {
	id: string;
	data: Partial<T>;
}) => {
	try {
		const response = await api({
			fetch,
			method: 'PATCH',
			url: `${apiUrl}/${id}`,
			data
		});

		return { data: response.data };
	} catch (e) {
		return { error: { errorKey, error: e } };
	}
};

export const deleteOne = async ({
	fetch,
	apiUrl,
	id,
	errorKey
}: HttpOptionsParams & {
	id: string;
}) => {
	try {
		const response = await api({
			fetch: fetch,
			method: 'DELETE',
			url: `${apiUrl}/${id}`
		});

		return { data: response.data };
	} catch (e: unknown) {
		return { error: { errorKey, error: e } };
	}
};
