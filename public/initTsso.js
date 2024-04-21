function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function initTsso() {
    console.log('initTsso');
    await wait(5000);
    localStorage.setItem('idToken', '111-222-333-444-555');
    console.log('initTsso finished');
};