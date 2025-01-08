export function esChisteChuck(objeto1, objeto2) {
    if (!Array.isArray(objeto1.categories) || !Array.isArray(objeto2.categories)) { return false; }
    if (typeof objeto1.created_at !== 'string' || typeof objeto2.created_at !== 'string') { return false; }
    if (typeof objeto1.icon_url !== 'string' || typeof objeto2.icon_url !== 'string') { return false; }
    if (typeof objeto1.id !== 'string' || typeof objeto2.id !== 'string') { return false; }
    if (typeof objeto1.updated_at !== 'string' || typeof objeto2.updated_at !== 'string') { return false; }
    if (typeof objeto1.url !== 'string' || typeof objeto2.url !== 'string') { return false; }
    if (typeof objeto1.value !== 'string' || typeof objeto2.value !== 'string') { return false; }
    return true;
}

export function esChisteDad(objeto1, objeto2) {
    if (typeof objeto1.id !== 'string' || typeof objeto2.id !== 'string') { return false; }
    if (typeof objeto1.joke !== 'string' || typeof objeto2.joke !== 'string') { return false; }
    if (typeof objeto1.status !== 'number' || typeof objeto2.status !== 'number') { return false; }
    return true;
}