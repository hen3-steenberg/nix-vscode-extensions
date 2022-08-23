const API_BASE_URL = "https://open-vsx.org/api/"

export const getExtensionsCount = async (): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}-/search?size=1`)
	if (response.status !== 200)
		throw `getExtensionsCount(): response.status === ${response.status}`
	return (await response.json()).totalSize
}

export const getExtensionURLs = async (count: number): Promise<string[]> => {
	const response = await fetch(`${API_BASE_URL}-/search?includeAllVersions=false&size=${count}`)
	if (response.status !== 200)
		throw `getExtensionsList(): response.status === ${response.status}`
	return (await response.json()).extensions.map((e: any) => e.url)
}

export const getExtensionData = async (url: string): Promise<any> => {
	const response = await fetch(url)
	if (response.status !== 200)
		throw `getExtensionData(): response.status === ${response.status}`
	return await response.json()
}

export const getExtensionsData = async () => {
	const count = await getExtensionsCount()
	const urls = await getExtensionURLs(count)

	return { count, data: await Promise.all(urls.map(url => getExtensionData(url))) }
}
