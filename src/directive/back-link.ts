export const back = {
    inserted(el: any) {
        el.addEventListener('click', () => {
            window.history.back()
        })
    }
}
