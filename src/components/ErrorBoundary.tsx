import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }


  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in Goni Market App:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetStorage = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">গনি মার্কেট অ্যাপ লোড হতে সমস্যা হয়েছে</h1>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              সাময়িক যান্ত্রিক ত্রুটির কারণে অ্যাপ্লিকেশনটিতে সমস্যা দেখা দিয়েছে। নিচের বাটন চেপে রিলোড দিন অথবা ডাটা রিসেট করুন।
            </p>

            {this.state.error && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-6 text-left overflow-x-auto">
                <p className="text-[10px] font-mono text-rose-400 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>অ্যাপ রিলোড দিন</span>
              </button>
              <button
                onClick={this.handleResetStorage}
                className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>ক্যাশ ও ডাটা রিসেট করুন</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
