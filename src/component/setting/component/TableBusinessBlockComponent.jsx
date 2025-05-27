const TableBusinessBlockComponent = ({ ref, setSelectedId, listBusinessBlock, setBusinessBlockDetail }) => {

    return (
        <>
            <div className="card-body p-0 tab-pane fade" id='business-block'>
                <div className="custom-datatable-filter table-responsive">
                    <div className="table-container">
                        <table className="table" id='myTable'>
                            <thead className="thead-light">
                                <tr>
                                    <th></th>
                                    <th>Tên nghiệp vụ</th>
                                    <th>Mã nghiệp vụ</th>
                                </tr>
                            </thead>
                            <tbody ref={ref}>
                                {listBusinessBlock && listBusinessBlock.length > 0 && listBusinessBlock.map((item, index) => (
                                    <tr key={item.id} onContextMenu={() => { setSelectedId(item.id); setBusinessBlockDetail(item); }}>
                                        <td></td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableBusinessBlockComponent;

