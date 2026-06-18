using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Capybara.Shared
{
    public abstract partial class AppComponentBase : ComponentBase, IDisposable
    {
        [Inject, NotNull] protected MessageService? MessageService { get; set; }
        [Inject, NotNull] protected IJSRuntime? JSRuntime { get; set; }
        [Inject, NotNull] protected NavigationManager? NavigationManager { get; set; }

        protected virtual Task BackToHome()
        {
            NavigationManager.NavigateTo("/");
            return Task.CompletedTask;
        }

        /// <summary>
        /// Dispose 方法
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {

        }

        /// <summary>
        /// Dispose 方法
        /// </summary>
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
