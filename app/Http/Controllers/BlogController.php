<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * 一覧画面を表示
     */
    public function index()
    {
        // 第一引数にコンポーネント、第二引数にプロパティ配列を渡す
        // ビューにblogテーブルの値を渡す
        return Inertia::render('Blog/Index',['blogs' => Blog::all()]);

    }

    /**
     * 新規登録フォームを表示
     */
    public function create()
    {
        return Inertia::render('Blog/Create');
    }

    /**
     * DBへ登録処理
     */
    public function store(StoreBlogRequest $request)
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required']
        ]);
    
        Blog::create($request->all());
    
        return redirect()->route('blog.index');
    }

    // public function show(Blog $blog)
    // {
    //     
    // }

    /**
     * 更新フォームを表示
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Blog/Edit',['blog' => $blog]);
    }

    /**
     * DBの更新処理
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required']
        ]);
    
        $blog->update($request->all());
    
        return redirect()->route('blog.index');
    }

    /**
     * DBの削除処理
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        
        return redirect()->route('blog.index');
    }
}
