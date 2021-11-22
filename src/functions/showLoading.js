function showLoading({setLoading}) {
    setTimeout(() => {
        setLoading(false)
    }, 2000);
}

export default showLoading;