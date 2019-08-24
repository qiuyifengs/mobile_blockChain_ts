export function isParent(children: any, parent: any) {
    if (!parent) {
        return false
    }
    while (children) {
        if (children === parent) {
            return true
        }
        children = children.parentNode
    }
    return false
}

export function extend(a: any, b: any) {
    for (const i in b) {
        if (b.hasOwnProperty(i) && b[i]) {
            a[i] = b[i]
        }
    }
}
