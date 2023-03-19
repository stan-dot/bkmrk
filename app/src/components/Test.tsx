export function Test() {
  return (
    <div className="justify-between flex border-2 ">
      <div className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid  focus:shadow ">
        <button>
          this button expands the child 1
        </button>
        <div id="hiddenChild1">
          <p>sometext 1</p>
        </div>
      </div>
      <div className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid  focus:shadow ">
        <button>
          this button expands the child 2
        </button>
        <div id="hiddenChild2">
          <p>sometext 2</p>
        </div>
      </div>
      <div className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid  focus:shadow ">
        <button>
          this button expands the child 3
        </button>
        <div id="hiddenChild3">
          <p>sometext 3</p>
        </div>
      </div>
      <div className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid  focus:shadow ">
        <button>
          this button expands the child 4
        </button>
        <div id="hiddenChild4">
          <p>sometext 4</p>
        </div>
      </div>
    </div>
  );
}
