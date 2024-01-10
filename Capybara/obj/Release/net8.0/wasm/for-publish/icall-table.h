#define ICALL_TABLE_corlib 1

static int corlib_icall_indexes [] = {
200,
209,
210,
211,
212,
213,
214,
215,
217,
218,
287,
288,
289,
318,
319,
320,
340,
341,
342,
343,
434,
435,
436,
439,
475,
476,
477,
478,
482,
484,
486,
488,
493,
501,
502,
503,
504,
505,
506,
507,
508,
509,
605,
606,
671,
677,
680,
682,
687,
688,
690,
691,
695,
696,
698,
700,
701,
704,
705,
706,
709,
711,
714,
716,
718,
727,
789,
791,
793,
803,
804,
805,
807,
813,
814,
815,
816,
817,
825,
826,
827,
831,
832,
834,
836,
1026,
1199,
1200,
6928,
6929,
6931,
6932,
6933,
6934,
6935,
6937,
6939,
6941,
6942,
6952,
6954,
6959,
6961,
6963,
6965,
7016,
7017,
7019,
7020,
7021,
7022,
7023,
7025,
7027,
8057,
8061,
8063,
8064,
8065,
8066,
8315,
8316,
8317,
8318,
8336,
8337,
8338,
8340,
8381,
8454,
8456,
8458,
8467,
8468,
8469,
8470,
8872,
8876,
8877,
8904,
8922,
8929,
8936,
8947,
8950,
8970,
9043,
9045,
9054,
9056,
9057,
9064,
9078,
9098,
9099,
9107,
9109,
9116,
9117,
9120,
9122,
9127,
9133,
9134,
9141,
9143,
9155,
9158,
9159,
9160,
9171,
9180,
9186,
9187,
9188,
9190,
9191,
9208,
9210,
9224,
9241,
9268,
9298,
9299,
9781,
9873,
9874,
10074,
10075,
10082,
10083,
10084,
10089,
10164,
10557,
10558,
10805,
10806,
10811,
10821,
11474,
11495,
11497,
11499,
};
void ves_icall_System_Array_InternalCreate (int,int,int,int,int);
int ves_icall_System_Array_GetCorElementTypeOfElementTypeInternal (int);
int ves_icall_System_Array_CanChangePrimitive (int,int,int);
int ves_icall_System_Array_FastCopy (int,int,int,int,int);
int ves_icall_System_Array_GetLengthInternal_raw (int,int,int);
int ves_icall_System_Array_GetLowerBoundInternal_raw (int,int,int);
void ves_icall_System_Array_GetGenericValue_icall (int,int,int);
void ves_icall_System_Array_GetValueImpl_raw (int,int,int,int);
void ves_icall_System_Array_SetValueImpl_raw (int,int,int,int);
void ves_icall_System_Array_SetValueRelaxedImpl_raw (int,int,int,int);
void ves_icall_System_Runtime_RuntimeImports_ZeroMemory (int,int);
void ves_icall_System_Runtime_RuntimeImports_Memmove (int,int,int);
void ves_icall_System_Buffer_BulkMoveWithWriteBarrier (int,int,int,int);
int ves_icall_System_Delegate_AllocDelegateLike_internal_raw (int,int);
int ves_icall_System_Delegate_CreateDelegate_internal_raw (int,int,int,int,int);
int ves_icall_System_Delegate_GetVirtualMethod_internal_raw (int,int);
void ves_icall_System_Enum_GetEnumValuesAndNames_raw (int,int,int,int);
void ves_icall_System_Enum_InternalBoxEnum_raw (int,int,int64_t,int);
int ves_icall_System_Enum_InternalGetCorElementType (int);
void ves_icall_System_Enum_InternalGetUnderlyingType_raw (int,int,int);
int ves_icall_System_Environment_get_ProcessorCount ();
int ves_icall_System_Environment_get_TickCount ();
int64_t ves_icall_System_Environment_get_TickCount64 ();
void ves_icall_System_Environment_FailFast_raw (int,int,int,int);
int ves_icall_System_GC_GetMaxGeneration ();
void ves_icall_System_GC_InternalCollect (int);
void ves_icall_System_GC_register_ephemeron_array_raw (int,int);
int ves_icall_System_GC_get_ephemeron_tombstone_raw (int);
void ves_icall_System_GC_SuppressFinalize_raw (int,int);
void ves_icall_System_GC_ReRegisterForFinalize_raw (int,int);
void ves_icall_System_GC_GetGCMemoryInfo (int,int,int,int,int,int);
int ves_icall_System_GC_AllocPinnedArray_raw (int,int,int);
int ves_icall_System_Object_MemberwiseClone_raw (int,int);
double ves_icall_System_Math_Ceiling (double);
double ves_icall_System_Math_Cos (double);
double ves_icall_System_Math_Floor (double);
double ves_icall_System_Math_Log10 (double);
double ves_icall_System_Math_Pow (double,double);
double ves_icall_System_Math_Sin (double);
double ves_icall_System_Math_Sqrt (double);
double ves_icall_System_Math_Tan (double);
double ves_icall_System_Math_ModF (double,int);
void ves_icall_RuntimeMethodHandle_ReboxFromNullable_raw (int,int,int);
void ves_icall_RuntimeMethodHandle_ReboxToNullable_raw (int,int,int,int);
int ves_icall_RuntimeType_GetCorrespondingInflatedMethod_raw (int,int,int);
void ves_icall_RuntimeType_make_array_type_raw (int,int,int,int);
void ves_icall_RuntimeType_make_byref_type_raw (int,int,int);
void ves_icall_RuntimeType_make_pointer_type_raw (int,int,int);
void ves_icall_RuntimeType_MakeGenericType_raw (int,int,int,int);
int ves_icall_RuntimeType_GetMethodsByName_native_raw (int,int,int,int,int);
int ves_icall_RuntimeType_GetPropertiesByName_native_raw (int,int,int,int,int);
int ves_icall_RuntimeType_GetConstructors_native_raw (int,int,int);
int ves_icall_System_RuntimeType_CreateInstanceInternal_raw (int,int);
void ves_icall_System_RuntimeType_AllocateValueType_raw (int,int,int,int);
void ves_icall_RuntimeType_GetDeclaringMethod_raw (int,int,int);
void ves_icall_System_RuntimeType_getFullName_raw (int,int,int,int,int);
void ves_icall_RuntimeType_GetGenericArgumentsInternal_raw (int,int,int,int);
int ves_icall_RuntimeType_GetGenericParameterPosition (int);
int ves_icall_RuntimeType_GetEvents_native_raw (int,int,int,int);
int ves_icall_RuntimeType_GetFields_native_raw (int,int,int,int,int);
void ves_icall_RuntimeType_GetInterfaces_raw (int,int,int);
int ves_icall_RuntimeType_GetNestedTypes_native_raw (int,int,int,int,int);
void ves_icall_RuntimeType_GetDeclaringType_raw (int,int,int);
void ves_icall_RuntimeType_GetName_raw (int,int,int);
void ves_icall_RuntimeType_GetNamespace_raw (int,int,int);
int ves_icall_RuntimeType_FunctionPointerReturnAndParameterTypes_raw (int,int);
int ves_icall_RuntimeTypeHandle_GetAttributes (int);
int ves_icall_RuntimeTypeHandle_GetMetadataToken_raw (int,int);
void ves_icall_RuntimeTypeHandle_GetGenericTypeDefinition_impl_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_GetCorElementType (int);
int ves_icall_RuntimeTypeHandle_HasInstantiation (int);
int ves_icall_RuntimeTypeHandle_IsInstanceOfType_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_HasReferences_raw (int,int);
int ves_icall_RuntimeTypeHandle_GetArrayRank_raw (int,int);
void ves_icall_RuntimeTypeHandle_GetAssembly_raw (int,int,int);
void ves_icall_RuntimeTypeHandle_GetElementType_raw (int,int,int);
void ves_icall_RuntimeTypeHandle_GetModule_raw (int,int,int);
void ves_icall_RuntimeTypeHandle_GetBaseType_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_type_is_assignable_from_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_IsGenericTypeDefinition (int);
int ves_icall_RuntimeTypeHandle_GetGenericParameterInfo_raw (int,int);
int ves_icall_RuntimeTypeHandle_is_subclass_of_raw (int,int,int);
int ves_icall_RuntimeTypeHandle_IsByRefLike_raw (int,int);
void ves_icall_System_RuntimeTypeHandle_internal_from_name_raw (int,int,int,int,int,int);
int ves_icall_System_String_FastAllocateString_raw (int,int);
int ves_icall_System_Type_internal_from_handle_raw (int,int);
int ves_icall_System_ValueType_InternalGetHashCode_raw (int,int,int);
int ves_icall_System_ValueType_Equals_raw (int,int,int,int);
int ves_icall_System_Threading_Interlocked_CompareExchange_Int (int,int,int);
void ves_icall_System_Threading_Interlocked_CompareExchange_Object (int,int,int,int);
int ves_icall_System_Threading_Interlocked_Decrement_Int (int);
int ves_icall_System_Threading_Interlocked_Increment_Int (int);
int64_t ves_icall_System_Threading_Interlocked_Increment_Long (int);
int ves_icall_System_Threading_Interlocked_Exchange_Int (int,int);
void ves_icall_System_Threading_Interlocked_Exchange_Object (int,int,int);
int64_t ves_icall_System_Threading_Interlocked_CompareExchange_Long (int,int64_t,int64_t);
int64_t ves_icall_System_Threading_Interlocked_Exchange_Long (int,int64_t);
int64_t ves_icall_System_Threading_Interlocked_Read_Long (int);
int ves_icall_System_Threading_Interlocked_Add_Int (int,int);
void ves_icall_System_Threading_Monitor_Monitor_Enter_raw (int,int);
void mono_monitor_exit_icall_raw (int,int);
void ves_icall_System_Threading_Monitor_Monitor_pulse_raw (int,int);
void ves_icall_System_Threading_Monitor_Monitor_pulse_all_raw (int,int);
int ves_icall_System_Threading_Monitor_Monitor_wait_raw (int,int,int,int);
void ves_icall_System_Threading_Monitor_Monitor_try_enter_with_atomic_var_raw (int,int,int,int,int);
void ves_icall_System_Threading_Thread_InitInternal_raw (int,int);
int ves_icall_System_Threading_Thread_GetCurrentThread ();
void ves_icall_System_Threading_InternalThread_Thread_free_internal_raw (int,int);
int ves_icall_System_Threading_Thread_GetState_raw (int,int);
void ves_icall_System_Threading_Thread_SetState_raw (int,int,int);
void ves_icall_System_Threading_Thread_ClrState_raw (int,int,int);
void ves_icall_System_Threading_Thread_SetName_icall_raw (int,int,int,int);
int ves_icall_System_Threading_Thread_YieldInternal ();
void ves_icall_System_Threading_Thread_SetPriority_raw (int,int,int);
void ves_icall_System_Runtime_Loader_AssemblyLoadContext_PrepareForAssemblyLoadContextRelease_raw (int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_GetLoadContextForAssembly_raw (int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFile_raw (int,int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalInitializeNativeALC_raw (int,int,int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFromStream_raw (int,int,int,int,int,int);
int ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalGetLoadedAssemblies_raw (int);
int ves_icall_System_GCHandle_InternalAlloc_raw (int,int,int);
void ves_icall_System_GCHandle_InternalFree_raw (int,int);
int ves_icall_System_GCHandle_InternalGet_raw (int,int);
void ves_icall_System_GCHandle_InternalSet_raw (int,int,int);
int ves_icall_System_Runtime_InteropServices_Marshal_GetLastPInvokeError ();
void ves_icall_System_Runtime_InteropServices_Marshal_SetLastPInvokeError (int);
void ves_icall_System_Runtime_InteropServices_Marshal_StructureToPtr_raw (int,int,int,int);
int ves_icall_System_Runtime_InteropServices_Marshal_SizeOfHelper_raw (int,int,int);
int ves_icall_System_Runtime_InteropServices_NativeLibrary_LoadByName_raw (int,int,int,int,int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalGetHashCode_raw (int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalTryGetHashCode_raw (int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetObjectValue_raw (int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetUninitializedObjectInternal_raw (int,int);
void ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InitializeArray_raw (int,int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetSpanDataFrom_raw (int,int,int,int);
int ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_SufficientExecutionStack ();
int ves_icall_System_Reflection_Assembly_GetEntryAssembly_raw (int);
int ves_icall_System_Reflection_Assembly_InternalLoad_raw (int,int,int,int);
int ves_icall_System_Reflection_Assembly_InternalGetType_raw (int,int,int,int,int,int);
int ves_icall_System_Reflection_AssemblyName_GetNativeName (int);
int ves_icall_MonoCustomAttrs_GetCustomAttributesInternal_raw (int,int,int,int);
int ves_icall_MonoCustomAttrs_GetCustomAttributesDataInternal_raw (int,int);
int ves_icall_MonoCustomAttrs_IsDefinedInternal_raw (int,int,int);
int ves_icall_System_Reflection_FieldInfo_internal_from_handle_type_raw (int,int,int);
int ves_icall_System_Reflection_FieldInfo_get_marshal_info_raw (int,int);
int ves_icall_System_Reflection_LoaderAllocatorScout_Destroy (int);
void ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceNames_raw (int,int,int);
void ves_icall_System_Reflection_RuntimeAssembly_GetExportedTypes_raw (int,int,int);
void ves_icall_System_Reflection_RuntimeAssembly_GetInfo_raw (int,int,int,int);
int ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceInternal_raw (int,int,int,int,int);
void ves_icall_System_Reflection_Assembly_GetManifestModuleInternal_raw (int,int,int);
void ves_icall_System_Reflection_RuntimeCustomAttributeData_ResolveArgumentsInternal_raw (int,int,int,int,int,int,int);
void ves_icall_RuntimeEventInfo_get_event_info_raw (int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_System_Reflection_EventInfo_internal_from_handle_type_raw (int,int,int);
int ves_icall_RuntimeFieldInfo_ResolveType_raw (int,int);
int ves_icall_RuntimeFieldInfo_GetParentType_raw (int,int,int);
int ves_icall_RuntimeFieldInfo_GetFieldOffset_raw (int,int);
int ves_icall_RuntimeFieldInfo_GetValueInternal_raw (int,int,int);
void ves_icall_RuntimeFieldInfo_SetValueInternal_raw (int,int,int,int);
int ves_icall_RuntimeFieldInfo_GetRawConstantValue_raw (int,int);
int ves_icall_reflection_get_token_raw (int,int);
void ves_icall_get_method_info_raw (int,int,int);
int ves_icall_get_method_attributes (int);
int ves_icall_System_Reflection_MonoMethodInfo_get_parameter_info_raw (int,int,int);
int ves_icall_System_MonoMethodInfo_get_retval_marshal_raw (int,int);
int ves_icall_System_Reflection_RuntimeMethodInfo_GetMethodFromHandleInternalType_native_raw (int,int,int,int);
int ves_icall_RuntimeMethodInfo_get_name_raw (int,int);
int ves_icall_RuntimeMethodInfo_get_base_method_raw (int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_InternalInvoke_raw (int,int,int,int,int);
void ves_icall_RuntimeMethodInfo_GetPInvoke_raw (int,int,int,int,int);
int ves_icall_RuntimeMethodInfo_MakeGenericMethod_impl_raw (int,int,int);
int ves_icall_RuntimeMethodInfo_GetGenericArguments_raw (int,int);
int ves_icall_RuntimeMethodInfo_GetGenericMethodDefinition_raw (int,int);
int ves_icall_RuntimeMethodInfo_get_IsGenericMethodDefinition_raw (int,int);
int ves_icall_RuntimeMethodInfo_get_IsGenericMethod_raw (int,int);
void ves_icall_InvokeClassConstructor_raw (int,int);
int ves_icall_InternalInvoke_raw (int,int,int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_System_Reflection_RuntimeModule_ResolveMethodToken_raw (int,int,int,int,int,int);
void ves_icall_RuntimePropertyInfo_get_property_info_raw (int,int,int,int);
int ves_icall_reflection_get_token_raw (int,int);
int ves_icall_System_Reflection_RuntimePropertyInfo_internal_from_handle_type_raw (int,int,int);
void ves_icall_DynamicMethod_create_dynamic_method_raw (int,int,int,int,int);
void ves_icall_AssemblyBuilder_basic_init_raw (int,int);
void ves_icall_AssemblyBuilder_UpdateNativeCustomAttributes_raw (int,int);
void ves_icall_ModuleBuilder_basic_init_raw (int,int);
void ves_icall_ModuleBuilder_set_wrappers_type_raw (int,int,int);
int ves_icall_ModuleBuilder_getUSIndex_raw (int,int,int);
int ves_icall_ModuleBuilder_getToken_raw (int,int,int,int);
int ves_icall_ModuleBuilder_getMethodToken_raw (int,int,int,int);
void ves_icall_ModuleBuilder_RegisterToken_raw (int,int,int,int);
int ves_icall_TypeBuilder_create_runtime_class_raw (int,int);
int ves_icall_System_IO_Stream_HasOverriddenBeginEndRead_raw (int,int);
int ves_icall_System_IO_Stream_HasOverriddenBeginEndWrite_raw (int,int);
int ves_icall_System_Diagnostics_Debugger_IsLogging ();
void ves_icall_System_Diagnostics_Debugger_Log (int,int,int);
int ves_icall_System_Diagnostics_StackFrame_GetFrameInfo (int,int,int,int,int,int,int,int);
void ves_icall_System_Diagnostics_StackTrace_GetTrace (int,int,int,int);
int ves_icall_Mono_RuntimeClassHandle_GetTypeFromClass (int);
void ves_icall_Mono_RuntimeGPtrArrayHandle_GPtrArrayFree (int);
int ves_icall_Mono_SafeStringMarshal_StringToUtf8 (int);
void ves_icall_Mono_SafeStringMarshal_GFree (int);
static void *corlib_icall_funcs [] = {
// token 200,
ves_icall_System_Array_InternalCreate,
// token 209,
ves_icall_System_Array_GetCorElementTypeOfElementTypeInternal,
// token 210,
ves_icall_System_Array_CanChangePrimitive,
// token 211,
ves_icall_System_Array_FastCopy,
// token 212,
ves_icall_System_Array_GetLengthInternal_raw,
// token 213,
ves_icall_System_Array_GetLowerBoundInternal_raw,
// token 214,
ves_icall_System_Array_GetGenericValue_icall,
// token 215,
ves_icall_System_Array_GetValueImpl_raw,
// token 217,
ves_icall_System_Array_SetValueImpl_raw,
// token 218,
ves_icall_System_Array_SetValueRelaxedImpl_raw,
// token 287,
ves_icall_System_Runtime_RuntimeImports_ZeroMemory,
// token 288,
ves_icall_System_Runtime_RuntimeImports_Memmove,
// token 289,
ves_icall_System_Buffer_BulkMoveWithWriteBarrier,
// token 318,
ves_icall_System_Delegate_AllocDelegateLike_internal_raw,
// token 319,
ves_icall_System_Delegate_CreateDelegate_internal_raw,
// token 320,
ves_icall_System_Delegate_GetVirtualMethod_internal_raw,
// token 340,
ves_icall_System_Enum_GetEnumValuesAndNames_raw,
// token 341,
ves_icall_System_Enum_InternalBoxEnum_raw,
// token 342,
ves_icall_System_Enum_InternalGetCorElementType,
// token 343,
ves_icall_System_Enum_InternalGetUnderlyingType_raw,
// token 434,
ves_icall_System_Environment_get_ProcessorCount,
// token 435,
ves_icall_System_Environment_get_TickCount,
// token 436,
ves_icall_System_Environment_get_TickCount64,
// token 439,
ves_icall_System_Environment_FailFast_raw,
// token 475,
ves_icall_System_GC_GetMaxGeneration,
// token 476,
ves_icall_System_GC_InternalCollect,
// token 477,
ves_icall_System_GC_register_ephemeron_array_raw,
// token 478,
ves_icall_System_GC_get_ephemeron_tombstone_raw,
// token 482,
ves_icall_System_GC_SuppressFinalize_raw,
// token 484,
ves_icall_System_GC_ReRegisterForFinalize_raw,
// token 486,
ves_icall_System_GC_GetGCMemoryInfo,
// token 488,
ves_icall_System_GC_AllocPinnedArray_raw,
// token 493,
ves_icall_System_Object_MemberwiseClone_raw,
// token 501,
ves_icall_System_Math_Ceiling,
// token 502,
ves_icall_System_Math_Cos,
// token 503,
ves_icall_System_Math_Floor,
// token 504,
ves_icall_System_Math_Log10,
// token 505,
ves_icall_System_Math_Pow,
// token 506,
ves_icall_System_Math_Sin,
// token 507,
ves_icall_System_Math_Sqrt,
// token 508,
ves_icall_System_Math_Tan,
// token 509,
ves_icall_System_Math_ModF,
// token 605,
ves_icall_RuntimeMethodHandle_ReboxFromNullable_raw,
// token 606,
ves_icall_RuntimeMethodHandle_ReboxToNullable_raw,
// token 671,
ves_icall_RuntimeType_GetCorrespondingInflatedMethod_raw,
// token 677,
ves_icall_RuntimeType_make_array_type_raw,
// token 680,
ves_icall_RuntimeType_make_byref_type_raw,
// token 682,
ves_icall_RuntimeType_make_pointer_type_raw,
// token 687,
ves_icall_RuntimeType_MakeGenericType_raw,
// token 688,
ves_icall_RuntimeType_GetMethodsByName_native_raw,
// token 690,
ves_icall_RuntimeType_GetPropertiesByName_native_raw,
// token 691,
ves_icall_RuntimeType_GetConstructors_native_raw,
// token 695,
ves_icall_System_RuntimeType_CreateInstanceInternal_raw,
// token 696,
ves_icall_System_RuntimeType_AllocateValueType_raw,
// token 698,
ves_icall_RuntimeType_GetDeclaringMethod_raw,
// token 700,
ves_icall_System_RuntimeType_getFullName_raw,
// token 701,
ves_icall_RuntimeType_GetGenericArgumentsInternal_raw,
// token 704,
ves_icall_RuntimeType_GetGenericParameterPosition,
// token 705,
ves_icall_RuntimeType_GetEvents_native_raw,
// token 706,
ves_icall_RuntimeType_GetFields_native_raw,
// token 709,
ves_icall_RuntimeType_GetInterfaces_raw,
// token 711,
ves_icall_RuntimeType_GetNestedTypes_native_raw,
// token 714,
ves_icall_RuntimeType_GetDeclaringType_raw,
// token 716,
ves_icall_RuntimeType_GetName_raw,
// token 718,
ves_icall_RuntimeType_GetNamespace_raw,
// token 727,
ves_icall_RuntimeType_FunctionPointerReturnAndParameterTypes_raw,
// token 789,
ves_icall_RuntimeTypeHandle_GetAttributes,
// token 791,
ves_icall_RuntimeTypeHandle_GetMetadataToken_raw,
// token 793,
ves_icall_RuntimeTypeHandle_GetGenericTypeDefinition_impl_raw,
// token 803,
ves_icall_RuntimeTypeHandle_GetCorElementType,
// token 804,
ves_icall_RuntimeTypeHandle_HasInstantiation,
// token 805,
ves_icall_RuntimeTypeHandle_IsInstanceOfType_raw,
// token 807,
ves_icall_RuntimeTypeHandle_HasReferences_raw,
// token 813,
ves_icall_RuntimeTypeHandle_GetArrayRank_raw,
// token 814,
ves_icall_RuntimeTypeHandle_GetAssembly_raw,
// token 815,
ves_icall_RuntimeTypeHandle_GetElementType_raw,
// token 816,
ves_icall_RuntimeTypeHandle_GetModule_raw,
// token 817,
ves_icall_RuntimeTypeHandle_GetBaseType_raw,
// token 825,
ves_icall_RuntimeTypeHandle_type_is_assignable_from_raw,
// token 826,
ves_icall_RuntimeTypeHandle_IsGenericTypeDefinition,
// token 827,
ves_icall_RuntimeTypeHandle_GetGenericParameterInfo_raw,
// token 831,
ves_icall_RuntimeTypeHandle_is_subclass_of_raw,
// token 832,
ves_icall_RuntimeTypeHandle_IsByRefLike_raw,
// token 834,
ves_icall_System_RuntimeTypeHandle_internal_from_name_raw,
// token 836,
ves_icall_System_String_FastAllocateString_raw,
// token 1026,
ves_icall_System_Type_internal_from_handle_raw,
// token 1199,
ves_icall_System_ValueType_InternalGetHashCode_raw,
// token 1200,
ves_icall_System_ValueType_Equals_raw,
// token 6928,
ves_icall_System_Threading_Interlocked_CompareExchange_Int,
// token 6929,
ves_icall_System_Threading_Interlocked_CompareExchange_Object,
// token 6931,
ves_icall_System_Threading_Interlocked_Decrement_Int,
// token 6932,
ves_icall_System_Threading_Interlocked_Increment_Int,
// token 6933,
ves_icall_System_Threading_Interlocked_Increment_Long,
// token 6934,
ves_icall_System_Threading_Interlocked_Exchange_Int,
// token 6935,
ves_icall_System_Threading_Interlocked_Exchange_Object,
// token 6937,
ves_icall_System_Threading_Interlocked_CompareExchange_Long,
// token 6939,
ves_icall_System_Threading_Interlocked_Exchange_Long,
// token 6941,
ves_icall_System_Threading_Interlocked_Read_Long,
// token 6942,
ves_icall_System_Threading_Interlocked_Add_Int,
// token 6952,
ves_icall_System_Threading_Monitor_Monitor_Enter_raw,
// token 6954,
mono_monitor_exit_icall_raw,
// token 6959,
ves_icall_System_Threading_Monitor_Monitor_pulse_raw,
// token 6961,
ves_icall_System_Threading_Monitor_Monitor_pulse_all_raw,
// token 6963,
ves_icall_System_Threading_Monitor_Monitor_wait_raw,
// token 6965,
ves_icall_System_Threading_Monitor_Monitor_try_enter_with_atomic_var_raw,
// token 7016,
ves_icall_System_Threading_Thread_InitInternal_raw,
// token 7017,
ves_icall_System_Threading_Thread_GetCurrentThread,
// token 7019,
ves_icall_System_Threading_InternalThread_Thread_free_internal_raw,
// token 7020,
ves_icall_System_Threading_Thread_GetState_raw,
// token 7021,
ves_icall_System_Threading_Thread_SetState_raw,
// token 7022,
ves_icall_System_Threading_Thread_ClrState_raw,
// token 7023,
ves_icall_System_Threading_Thread_SetName_icall_raw,
// token 7025,
ves_icall_System_Threading_Thread_YieldInternal,
// token 7027,
ves_icall_System_Threading_Thread_SetPriority_raw,
// token 8057,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_PrepareForAssemblyLoadContextRelease_raw,
// token 8061,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_GetLoadContextForAssembly_raw,
// token 8063,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFile_raw,
// token 8064,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalInitializeNativeALC_raw,
// token 8065,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFromStream_raw,
// token 8066,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalGetLoadedAssemblies_raw,
// token 8315,
ves_icall_System_GCHandle_InternalAlloc_raw,
// token 8316,
ves_icall_System_GCHandle_InternalFree_raw,
// token 8317,
ves_icall_System_GCHandle_InternalGet_raw,
// token 8318,
ves_icall_System_GCHandle_InternalSet_raw,
// token 8336,
ves_icall_System_Runtime_InteropServices_Marshal_GetLastPInvokeError,
// token 8337,
ves_icall_System_Runtime_InteropServices_Marshal_SetLastPInvokeError,
// token 8338,
ves_icall_System_Runtime_InteropServices_Marshal_StructureToPtr_raw,
// token 8340,
ves_icall_System_Runtime_InteropServices_Marshal_SizeOfHelper_raw,
// token 8381,
ves_icall_System_Runtime_InteropServices_NativeLibrary_LoadByName_raw,
// token 8454,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalGetHashCode_raw,
// token 8456,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalTryGetHashCode_raw,
// token 8458,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetObjectValue_raw,
// token 8467,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetUninitializedObjectInternal_raw,
// token 8468,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InitializeArray_raw,
// token 8469,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetSpanDataFrom_raw,
// token 8470,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_SufficientExecutionStack,
// token 8872,
ves_icall_System_Reflection_Assembly_GetEntryAssembly_raw,
// token 8876,
ves_icall_System_Reflection_Assembly_InternalLoad_raw,
// token 8877,
ves_icall_System_Reflection_Assembly_InternalGetType_raw,
// token 8904,
ves_icall_System_Reflection_AssemblyName_GetNativeName,
// token 8922,
ves_icall_MonoCustomAttrs_GetCustomAttributesInternal_raw,
// token 8929,
ves_icall_MonoCustomAttrs_GetCustomAttributesDataInternal_raw,
// token 8936,
ves_icall_MonoCustomAttrs_IsDefinedInternal_raw,
// token 8947,
ves_icall_System_Reflection_FieldInfo_internal_from_handle_type_raw,
// token 8950,
ves_icall_System_Reflection_FieldInfo_get_marshal_info_raw,
// token 8970,
ves_icall_System_Reflection_LoaderAllocatorScout_Destroy,
// token 9043,
ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceNames_raw,
// token 9045,
ves_icall_System_Reflection_RuntimeAssembly_GetExportedTypes_raw,
// token 9054,
ves_icall_System_Reflection_RuntimeAssembly_GetInfo_raw,
// token 9056,
ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceInternal_raw,
// token 9057,
ves_icall_System_Reflection_Assembly_GetManifestModuleInternal_raw,
// token 9064,
ves_icall_System_Reflection_RuntimeCustomAttributeData_ResolveArgumentsInternal_raw,
// token 9078,
ves_icall_RuntimeEventInfo_get_event_info_raw,
// token 9098,
ves_icall_reflection_get_token_raw,
// token 9099,
ves_icall_System_Reflection_EventInfo_internal_from_handle_type_raw,
// token 9107,
ves_icall_RuntimeFieldInfo_ResolveType_raw,
// token 9109,
ves_icall_RuntimeFieldInfo_GetParentType_raw,
// token 9116,
ves_icall_RuntimeFieldInfo_GetFieldOffset_raw,
// token 9117,
ves_icall_RuntimeFieldInfo_GetValueInternal_raw,
// token 9120,
ves_icall_RuntimeFieldInfo_SetValueInternal_raw,
// token 9122,
ves_icall_RuntimeFieldInfo_GetRawConstantValue_raw,
// token 9127,
ves_icall_reflection_get_token_raw,
// token 9133,
ves_icall_get_method_info_raw,
// token 9134,
ves_icall_get_method_attributes,
// token 9141,
ves_icall_System_Reflection_MonoMethodInfo_get_parameter_info_raw,
// token 9143,
ves_icall_System_MonoMethodInfo_get_retval_marshal_raw,
// token 9155,
ves_icall_System_Reflection_RuntimeMethodInfo_GetMethodFromHandleInternalType_native_raw,
// token 9158,
ves_icall_RuntimeMethodInfo_get_name_raw,
// token 9159,
ves_icall_RuntimeMethodInfo_get_base_method_raw,
// token 9160,
ves_icall_reflection_get_token_raw,
// token 9171,
ves_icall_InternalInvoke_raw,
// token 9180,
ves_icall_RuntimeMethodInfo_GetPInvoke_raw,
// token 9186,
ves_icall_RuntimeMethodInfo_MakeGenericMethod_impl_raw,
// token 9187,
ves_icall_RuntimeMethodInfo_GetGenericArguments_raw,
// token 9188,
ves_icall_RuntimeMethodInfo_GetGenericMethodDefinition_raw,
// token 9190,
ves_icall_RuntimeMethodInfo_get_IsGenericMethodDefinition_raw,
// token 9191,
ves_icall_RuntimeMethodInfo_get_IsGenericMethod_raw,
// token 9208,
ves_icall_InvokeClassConstructor_raw,
// token 9210,
ves_icall_InternalInvoke_raw,
// token 9224,
ves_icall_reflection_get_token_raw,
// token 9241,
ves_icall_System_Reflection_RuntimeModule_ResolveMethodToken_raw,
// token 9268,
ves_icall_RuntimePropertyInfo_get_property_info_raw,
// token 9298,
ves_icall_reflection_get_token_raw,
// token 9299,
ves_icall_System_Reflection_RuntimePropertyInfo_internal_from_handle_type_raw,
// token 9781,
ves_icall_DynamicMethod_create_dynamic_method_raw,
// token 9873,
ves_icall_AssemblyBuilder_basic_init_raw,
// token 9874,
ves_icall_AssemblyBuilder_UpdateNativeCustomAttributes_raw,
// token 10074,
ves_icall_ModuleBuilder_basic_init_raw,
// token 10075,
ves_icall_ModuleBuilder_set_wrappers_type_raw,
// token 10082,
ves_icall_ModuleBuilder_getUSIndex_raw,
// token 10083,
ves_icall_ModuleBuilder_getToken_raw,
// token 10084,
ves_icall_ModuleBuilder_getMethodToken_raw,
// token 10089,
ves_icall_ModuleBuilder_RegisterToken_raw,
// token 10164,
ves_icall_TypeBuilder_create_runtime_class_raw,
// token 10557,
ves_icall_System_IO_Stream_HasOverriddenBeginEndRead_raw,
// token 10558,
ves_icall_System_IO_Stream_HasOverriddenBeginEndWrite_raw,
// token 10805,
ves_icall_System_Diagnostics_Debugger_IsLogging,
// token 10806,
ves_icall_System_Diagnostics_Debugger_Log,
// token 10811,
ves_icall_System_Diagnostics_StackFrame_GetFrameInfo,
// token 10821,
ves_icall_System_Diagnostics_StackTrace_GetTrace,
// token 11474,
ves_icall_Mono_RuntimeClassHandle_GetTypeFromClass,
// token 11495,
ves_icall_Mono_RuntimeGPtrArrayHandle_GPtrArrayFree,
// token 11497,
ves_icall_Mono_SafeStringMarshal_StringToUtf8,
// token 11499,
ves_icall_Mono_SafeStringMarshal_GFree,
};
static uint8_t corlib_icall_flags [] = {
0,
0,
0,
0,
4,
4,
0,
4,
4,
4,
0,
0,
0,
4,
4,
4,
4,
4,
0,
4,
0,
0,
0,
4,
0,
0,
4,
4,
4,
4,
0,
4,
4,
0,
0,
0,
0,
0,
0,
0,
0,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
0,
0,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
0,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
4,
0,
0,
0,
0,
0,
0,
0,
0,
};
