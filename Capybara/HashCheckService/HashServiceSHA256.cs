﻿using Microsoft.JSInterop;

namespace Capybara.HashCheckService;
public class HashServiceSHA256 : IHashService
{
    private readonly IJSRuntime _jSRuntime;
    public HashServiceSHA256(IJSRuntime jSRuntime)
    {
        _jSRuntime = jSRuntime;
    }

    public async Task<string> ComputeHashAsync(string text, bool isToUpper)
    {
        var value = await _jSRuntime.InvokeAsync<string>("GetTextSHA256", text);
        return value.ToUpperOrLower(isToUpper);
    }

    public async Task<string> ComputeHashAsync(byte[] buffer, bool isToUpper)
    {
        var value = await _jSRuntime.InvokeAsync<string>("GetFileSHA256", buffer);
        return value.ToUpperOrLower(isToUpper);
    }
}