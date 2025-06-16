import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TODO アプリ
          </h1>
          <p className="text-gray-600">
            シンプルで使いやすいタスク管理ツール
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6">
          <TodoInput />
          <TodoList />
          <TodoFooter />
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>
            ダブルクリックでタスクを編集 | Enterキーで追加 | Escキーでキャンセル
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
