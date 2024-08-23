# Adding a new task
node ./main.msj add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
node ./main.msj update 1 "Buy groceries and cook dinner"
node ./main.msj delete 1

# Marking a task as in progress or done
node ./main.msj mark-in-progress 1
node ./main.msj mark-done 1

# Listing all tasks
node ./main.msj list
node ./main.msj list all

# Listing tasks by status
node ./main.msj list done
node ./main.msj list todo
node ./main.msj list in-progress