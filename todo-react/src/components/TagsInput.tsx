const TagsInput = ({ tags, removeTag, handleTags }: any) => {
  return (
    <div className="tags-input-container">
      {tags?.map((tag: any, i: any) => {
        return (
          <div className="tag-item" key={i}>
            <span className="text">{tag.name}</span>
            <span className="close" onClick={() => removeTag(i)}>
              &times;
            </span>
          </div>
        );
      })}
      <input
        onKeyDown={handleTags}
        type="text"
        placeholder="Type to create a tag..."
        className="tags-input-container_input"
      />
    </div>
  );
};

export default TagsInput;
