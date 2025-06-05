export function paginate(data, currentPage, pageSize) {
    const totalPages = Math.ceil(data.length / pageSize);
    const pagedList = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return { pagedList, totalPages };
}
