export default function (gaId: string) {
	// adds first script tag
	const scriptTag1 = document.createElement('script')
	scriptTag1.async = true
	scriptTag1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
	document.head.append(scriptTag1)

	// adds second script tag
	const scriptTag2 = document.createElement('script')
	scriptTag2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${gaId}');
    `
	document.head.append(scriptTag2)
}
