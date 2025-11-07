class CreateBooks < ActiveRecord::Migration[8.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :image_url
      t.text :description
      t.string :isbn

      t.timestamps
    end
  end
end
