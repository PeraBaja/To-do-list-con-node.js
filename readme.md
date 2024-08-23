# Adding a new task
node ./main.mjs add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
node ./main.mjs update 1 "Buy groceries and cook dinner"
node ./main.mjs delete 1

# Marking a task as in progress or done
node ./main.mjs mark-in-progress 1
node ./main.mjs mark-done 1

# Listing all tasks
node ./main.mjs list
node ./main.mjs list all

# Listing tasks by status
node ./main.mjs list done
node ./main.mjs list todo
node ./main.mjs list in-progress