const TagsInput = ({ tags, removeTag, handleTags }: any) => {
  // const [tags, setTags] = useState<string[]>([]);

  // const removeTag = (idx: number) => {
  //   setTags(tags.filter((_, i) => i !== idx));
  // };

  // const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key !== 'Enter') return;
  //   let inputValue = (e.currentTarget as HTMLInputElement).value.trim();

  //   if (!inputValue.trim()) return;
  //   setTags([...tags, inputValue]);

  //   (e.currentTarget as HTMLInputElement).value = '';
  // };

  return (
    <div className="tags-input-container">
      {tags.map((tag: any, i: any) => {
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
