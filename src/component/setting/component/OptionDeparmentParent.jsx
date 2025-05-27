const OptionDeparmentParent = ({ explorer, dash = "-", level = 0 }) => {
    return (
        <>
            {
                explorer && (
                    <>
                        <option value={explorer.id}>{dash.repeat(level)} {explorer.name}</option>
                        {explorer.children && explorer.children.map((explorer) => (
                            <OptionDeparmentParent explorer={explorer} dash={"-"} level={level + 2} />
                        ))}
                    </>
                )
            }
        </>
    );
};

export default OptionDeparmentParent;
