#define ICALL_TABLE_corlib 1

static int corlib_icall_indexes [] = {
211,
221,
222,
223,
224,
225,
226,
227,
228,
229,
232,
233,
340,
341,
342,
371,
372,
373,
393,
394,
395,
396,
493,
494,
495,
498,
535,
536,
537,
538,
542,
544,
546,
548,
553,
561,
562,
563,
564,
565,
566,
567,
568,
569,
665,
666,
731,
737,
740,
742,
747,
748,
750,
751,
755,
756,
758,
760,
761,
764,
765,
766,
769,
771,
774,
776,
778,
787,
851,
853,
855,
865,
866,
867,
868,
870,
877,
878,
879,
880,
881,
889,
890,
891,
895,
896,
898,
902,
903,
904,
1183,
1359,
1360,
7423,
7424,
7426,
7427,
7428,
7429,
7430,
7432,
7434,
7436,
7437,
7438,
7448,
7450,
7457,
7459,
7461,
7463,
7514,
7515,
7517,
7518,
7519,
7520,
7521,
7523,
7525,
8583,
8587,
8589,
8590,
8591,
8592,
8841,
8842,
8843,
8844,
8862,
8863,
8864,
8866,
8909,
8980,
8982,
8984,
8993,
8994,
8995,
8996,
9443,
9448,
9449,
9476,
9494,
9501,
9508,
9519,
9522,
9542,
9615,
9617,
9626,
9628,
9629,
9636,
9650,
9670,
9671,
9679,
9681,
9688,
9689,
9692,
9694,
9699,
9705,
9706,
9713,
9715,
9727,
9730,
9731,
9732,
9743,
9752,
9758,
9759,
9760,
9762,
9763,
9780,
9782,
9796,
9813,
9840,
9870,
9871,
10355,
10447,
10448,
10650,
10651,
10658,
10659,
10660,
10665,
10740,
11253,
11254,
11756,
11757,
11762,
11772,
12553,
12574,
12576,
12578,
};
void ves_icall_System_Array_InternalCreate (int,int,int,int,int);
int ves_icall_System_Array_GetCorElementTypeOfElementTypeInternal (int);
int ves_icall_System_Array_IsValueOfElementTypeInternal (int,int);
int ves_icall_System_Array_CanChangePrimitive (int,int,int);
int ves_icall_System_Array_FastCopy (int,int,int,int,int);
int ves_icall_System_Array_GetLengthInternal_raw (int,int,int);
int ves_icall_System_Array_GetLowerBoundInternal_raw (int,int,int);
void ves_icall_System_Array_GetGenericValue_icall (int,int,int);
void ves_icall_System_Array_GetValueImpl_raw (int,int,int,int);
void ves_icall_System_Array_SetGenericValue_icall (int,int,int);
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
int ves_icall_RuntimeTypeHandle_IsComObject_raw (int,int);
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
int ves_icall_System_String_InternalIsInterned_raw (int,int);
int ves_icall_System_String_InternalIntern_raw (int,int);
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
int64_t ves_icall_System_Threading_Interlocked_Add_Long (int,int64_t);
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
// token 211,
ves_icall_System_Array_InternalCreate,
// token 221,
ves_icall_System_Array_GetCorElementTypeOfElementTypeInternal,
// token 222,
ves_icall_System_Array_IsValueOfElementTypeInternal,
// token 223,
ves_icall_System_Array_CanChangePrimitive,
// token 224,
ves_icall_System_Array_FastCopy,
// token 225,
ves_icall_System_Array_GetLengthInternal_raw,
// token 226,
ves_icall_System_Array_GetLowerBoundInternal_raw,
// token 227,
ves_icall_System_Array_GetGenericValue_icall,
// token 228,
ves_icall_System_Array_GetValueImpl_raw,
// token 229,
ves_icall_System_Array_SetGenericValue_icall,
// token 232,
ves_icall_System_Array_SetValueImpl_raw,
// token 233,
ves_icall_System_Array_SetValueRelaxedImpl_raw,
// token 340,
ves_icall_System_Runtime_RuntimeImports_ZeroMemory,
// token 341,
ves_icall_System_Runtime_RuntimeImports_Memmove,
// token 342,
ves_icall_System_Buffer_BulkMoveWithWriteBarrier,
// token 371,
ves_icall_System_Delegate_AllocDelegateLike_internal_raw,
// token 372,
ves_icall_System_Delegate_CreateDelegate_internal_raw,
// token 373,
ves_icall_System_Delegate_GetVirtualMethod_internal_raw,
// token 393,
ves_icall_System_Enum_GetEnumValuesAndNames_raw,
// token 394,
ves_icall_System_Enum_InternalBoxEnum_raw,
// token 395,
ves_icall_System_Enum_InternalGetCorElementType,
// token 396,
ves_icall_System_Enum_InternalGetUnderlyingType_raw,
// token 493,
ves_icall_System_Environment_get_ProcessorCount,
// token 494,
ves_icall_System_Environment_get_TickCount,
// token 495,
ves_icall_System_Environment_get_TickCount64,
// token 498,
ves_icall_System_Environment_FailFast_raw,
// token 535,
ves_icall_System_GC_GetMaxGeneration,
// token 536,
ves_icall_System_GC_InternalCollect,
// token 537,
ves_icall_System_GC_register_ephemeron_array_raw,
// token 538,
ves_icall_System_GC_get_ephemeron_tombstone_raw,
// token 542,
ves_icall_System_GC_SuppressFinalize_raw,
// token 544,
ves_icall_System_GC_ReRegisterForFinalize_raw,
// token 546,
ves_icall_System_GC_GetGCMemoryInfo,
// token 548,
ves_icall_System_GC_AllocPinnedArray_raw,
// token 553,
ves_icall_System_Object_MemberwiseClone_raw,
// token 561,
ves_icall_System_Math_Ceiling,
// token 562,
ves_icall_System_Math_Cos,
// token 563,
ves_icall_System_Math_Floor,
// token 564,
ves_icall_System_Math_Log10,
// token 565,
ves_icall_System_Math_Pow,
// token 566,
ves_icall_System_Math_Sin,
// token 567,
ves_icall_System_Math_Sqrt,
// token 568,
ves_icall_System_Math_Tan,
// token 569,
ves_icall_System_Math_ModF,
// token 665,
ves_icall_RuntimeMethodHandle_ReboxFromNullable_raw,
// token 666,
ves_icall_RuntimeMethodHandle_ReboxToNullable_raw,
// token 731,
ves_icall_RuntimeType_GetCorrespondingInflatedMethod_raw,
// token 737,
ves_icall_RuntimeType_make_array_type_raw,
// token 740,
ves_icall_RuntimeType_make_byref_type_raw,
// token 742,
ves_icall_RuntimeType_make_pointer_type_raw,
// token 747,
ves_icall_RuntimeType_MakeGenericType_raw,
// token 748,
ves_icall_RuntimeType_GetMethodsByName_native_raw,
// token 750,
ves_icall_RuntimeType_GetPropertiesByName_native_raw,
// token 751,
ves_icall_RuntimeType_GetConstructors_native_raw,
// token 755,
ves_icall_System_RuntimeType_CreateInstanceInternal_raw,
// token 756,
ves_icall_System_RuntimeType_AllocateValueType_raw,
// token 758,
ves_icall_RuntimeType_GetDeclaringMethod_raw,
// token 760,
ves_icall_System_RuntimeType_getFullName_raw,
// token 761,
ves_icall_RuntimeType_GetGenericArgumentsInternal_raw,
// token 764,
ves_icall_RuntimeType_GetGenericParameterPosition,
// token 765,
ves_icall_RuntimeType_GetEvents_native_raw,
// token 766,
ves_icall_RuntimeType_GetFields_native_raw,
// token 769,
ves_icall_RuntimeType_GetInterfaces_raw,
// token 771,
ves_icall_RuntimeType_GetNestedTypes_native_raw,
// token 774,
ves_icall_RuntimeType_GetDeclaringType_raw,
// token 776,
ves_icall_RuntimeType_GetName_raw,
// token 778,
ves_icall_RuntimeType_GetNamespace_raw,
// token 787,
ves_icall_RuntimeType_FunctionPointerReturnAndParameterTypes_raw,
// token 851,
ves_icall_RuntimeTypeHandle_GetAttributes,
// token 853,
ves_icall_RuntimeTypeHandle_GetMetadataToken_raw,
// token 855,
ves_icall_RuntimeTypeHandle_GetGenericTypeDefinition_impl_raw,
// token 865,
ves_icall_RuntimeTypeHandle_GetCorElementType,
// token 866,
ves_icall_RuntimeTypeHandle_HasInstantiation,
// token 867,
ves_icall_RuntimeTypeHandle_IsComObject_raw,
// token 868,
ves_icall_RuntimeTypeHandle_IsInstanceOfType_raw,
// token 870,
ves_icall_RuntimeTypeHandle_HasReferences_raw,
// token 877,
ves_icall_RuntimeTypeHandle_GetArrayRank_raw,
// token 878,
ves_icall_RuntimeTypeHandle_GetAssembly_raw,
// token 879,
ves_icall_RuntimeTypeHandle_GetElementType_raw,
// token 880,
ves_icall_RuntimeTypeHandle_GetModule_raw,
// token 881,
ves_icall_RuntimeTypeHandle_GetBaseType_raw,
// token 889,
ves_icall_RuntimeTypeHandle_type_is_assignable_from_raw,
// token 890,
ves_icall_RuntimeTypeHandle_IsGenericTypeDefinition,
// token 891,
ves_icall_RuntimeTypeHandle_GetGenericParameterInfo_raw,
// token 895,
ves_icall_RuntimeTypeHandle_is_subclass_of_raw,
// token 896,
ves_icall_RuntimeTypeHandle_IsByRefLike_raw,
// token 898,
ves_icall_System_RuntimeTypeHandle_internal_from_name_raw,
// token 902,
ves_icall_System_String_FastAllocateString_raw,
// token 903,
ves_icall_System_String_InternalIsInterned_raw,
// token 904,
ves_icall_System_String_InternalIntern_raw,
// token 1183,
ves_icall_System_Type_internal_from_handle_raw,
// token 1359,
ves_icall_System_ValueType_InternalGetHashCode_raw,
// token 1360,
ves_icall_System_ValueType_Equals_raw,
// token 7423,
ves_icall_System_Threading_Interlocked_CompareExchange_Int,
// token 7424,
ves_icall_System_Threading_Interlocked_CompareExchange_Object,
// token 7426,
ves_icall_System_Threading_Interlocked_Decrement_Int,
// token 7427,
ves_icall_System_Threading_Interlocked_Increment_Int,
// token 7428,
ves_icall_System_Threading_Interlocked_Increment_Long,
// token 7429,
ves_icall_System_Threading_Interlocked_Exchange_Int,
// token 7430,
ves_icall_System_Threading_Interlocked_Exchange_Object,
// token 7432,
ves_icall_System_Threading_Interlocked_CompareExchange_Long,
// token 7434,
ves_icall_System_Threading_Interlocked_Exchange_Long,
// token 7436,
ves_icall_System_Threading_Interlocked_Read_Long,
// token 7437,
ves_icall_System_Threading_Interlocked_Add_Int,
// token 7438,
ves_icall_System_Threading_Interlocked_Add_Long,
// token 7448,
ves_icall_System_Threading_Monitor_Monitor_Enter_raw,
// token 7450,
mono_monitor_exit_icall_raw,
// token 7457,
ves_icall_System_Threading_Monitor_Monitor_pulse_raw,
// token 7459,
ves_icall_System_Threading_Monitor_Monitor_pulse_all_raw,
// token 7461,
ves_icall_System_Threading_Monitor_Monitor_wait_raw,
// token 7463,
ves_icall_System_Threading_Monitor_Monitor_try_enter_with_atomic_var_raw,
// token 7514,
ves_icall_System_Threading_Thread_InitInternal_raw,
// token 7515,
ves_icall_System_Threading_Thread_GetCurrentThread,
// token 7517,
ves_icall_System_Threading_InternalThread_Thread_free_internal_raw,
// token 7518,
ves_icall_System_Threading_Thread_GetState_raw,
// token 7519,
ves_icall_System_Threading_Thread_SetState_raw,
// token 7520,
ves_icall_System_Threading_Thread_ClrState_raw,
// token 7521,
ves_icall_System_Threading_Thread_SetName_icall_raw,
// token 7523,
ves_icall_System_Threading_Thread_YieldInternal,
// token 7525,
ves_icall_System_Threading_Thread_SetPriority_raw,
// token 8583,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_PrepareForAssemblyLoadContextRelease_raw,
// token 8587,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_GetLoadContextForAssembly_raw,
// token 8589,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFile_raw,
// token 8590,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalInitializeNativeALC_raw,
// token 8591,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalLoadFromStream_raw,
// token 8592,
ves_icall_System_Runtime_Loader_AssemblyLoadContext_InternalGetLoadedAssemblies_raw,
// token 8841,
ves_icall_System_GCHandle_InternalAlloc_raw,
// token 8842,
ves_icall_System_GCHandle_InternalFree_raw,
// token 8843,
ves_icall_System_GCHandle_InternalGet_raw,
// token 8844,
ves_icall_System_GCHandle_InternalSet_raw,
// token 8862,
ves_icall_System_Runtime_InteropServices_Marshal_GetLastPInvokeError,
// token 8863,
ves_icall_System_Runtime_InteropServices_Marshal_SetLastPInvokeError,
// token 8864,
ves_icall_System_Runtime_InteropServices_Marshal_StructureToPtr_raw,
// token 8866,
ves_icall_System_Runtime_InteropServices_Marshal_SizeOfHelper_raw,
// token 8909,
ves_icall_System_Runtime_InteropServices_NativeLibrary_LoadByName_raw,
// token 8980,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalGetHashCode_raw,
// token 8982,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InternalTryGetHashCode_raw,
// token 8984,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetObjectValue_raw,
// token 8993,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetUninitializedObjectInternal_raw,
// token 8994,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_InitializeArray_raw,
// token 8995,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_GetSpanDataFrom_raw,
// token 8996,
ves_icall_System_Runtime_CompilerServices_RuntimeHelpers_SufficientExecutionStack,
// token 9443,
ves_icall_System_Reflection_Assembly_GetEntryAssembly_raw,
// token 9448,
ves_icall_System_Reflection_Assembly_InternalLoad_raw,
// token 9449,
ves_icall_System_Reflection_Assembly_InternalGetType_raw,
// token 9476,
ves_icall_System_Reflection_AssemblyName_GetNativeName,
// token 9494,
ves_icall_MonoCustomAttrs_GetCustomAttributesInternal_raw,
// token 9501,
ves_icall_MonoCustomAttrs_GetCustomAttributesDataInternal_raw,
// token 9508,
ves_icall_MonoCustomAttrs_IsDefinedInternal_raw,
// token 9519,
ves_icall_System_Reflection_FieldInfo_internal_from_handle_type_raw,
// token 9522,
ves_icall_System_Reflection_FieldInfo_get_marshal_info_raw,
// token 9542,
ves_icall_System_Reflection_LoaderAllocatorScout_Destroy,
// token 9615,
ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceNames_raw,
// token 9617,
ves_icall_System_Reflection_RuntimeAssembly_GetExportedTypes_raw,
// token 9626,
ves_icall_System_Reflection_RuntimeAssembly_GetInfo_raw,
// token 9628,
ves_icall_System_Reflection_RuntimeAssembly_GetManifestResourceInternal_raw,
// token 9629,
ves_icall_System_Reflection_Assembly_GetManifestModuleInternal_raw,
// token 9636,
ves_icall_System_Reflection_RuntimeCustomAttributeData_ResolveArgumentsInternal_raw,
// token 9650,
ves_icall_RuntimeEventInfo_get_event_info_raw,
// token 9670,
ves_icall_reflection_get_token_raw,
// token 9671,
ves_icall_System_Reflection_EventInfo_internal_from_handle_type_raw,
// token 9679,
ves_icall_RuntimeFieldInfo_ResolveType_raw,
// token 9681,
ves_icall_RuntimeFieldInfo_GetParentType_raw,
// token 9688,
ves_icall_RuntimeFieldInfo_GetFieldOffset_raw,
// token 9689,
ves_icall_RuntimeFieldInfo_GetValueInternal_raw,
// token 9692,
ves_icall_RuntimeFieldInfo_SetValueInternal_raw,
// token 9694,
ves_icall_RuntimeFieldInfo_GetRawConstantValue_raw,
// token 9699,
ves_icall_reflection_get_token_raw,
// token 9705,
ves_icall_get_method_info_raw,
// token 9706,
ves_icall_get_method_attributes,
// token 9713,
ves_icall_System_Reflection_MonoMethodInfo_get_parameter_info_raw,
// token 9715,
ves_icall_System_MonoMethodInfo_get_retval_marshal_raw,
// token 9727,
ves_icall_System_Reflection_RuntimeMethodInfo_GetMethodFromHandleInternalType_native_raw,
// token 9730,
ves_icall_RuntimeMethodInfo_get_name_raw,
// token 9731,
ves_icall_RuntimeMethodInfo_get_base_method_raw,
// token 9732,
ves_icall_reflection_get_token_raw,
// token 9743,
ves_icall_InternalInvoke_raw,
// token 9752,
ves_icall_RuntimeMethodInfo_GetPInvoke_raw,
// token 9758,
ves_icall_RuntimeMethodInfo_MakeGenericMethod_impl_raw,
// token 9759,
ves_icall_RuntimeMethodInfo_GetGenericArguments_raw,
// token 9760,
ves_icall_RuntimeMethodInfo_GetGenericMethodDefinition_raw,
// token 9762,
ves_icall_RuntimeMethodInfo_get_IsGenericMethodDefinition_raw,
// token 9763,
ves_icall_RuntimeMethodInfo_get_IsGenericMethod_raw,
// token 9780,
ves_icall_InvokeClassConstructor_raw,
// token 9782,
ves_icall_InternalInvoke_raw,
// token 9796,
ves_icall_reflection_get_token_raw,
// token 9813,
ves_icall_System_Reflection_RuntimeModule_ResolveMethodToken_raw,
// token 9840,
ves_icall_RuntimePropertyInfo_get_property_info_raw,
// token 9870,
ves_icall_reflection_get_token_raw,
// token 9871,
ves_icall_System_Reflection_RuntimePropertyInfo_internal_from_handle_type_raw,
// token 10355,
ves_icall_DynamicMethod_create_dynamic_method_raw,
// token 10447,
ves_icall_AssemblyBuilder_basic_init_raw,
// token 10448,
ves_icall_AssemblyBuilder_UpdateNativeCustomAttributes_raw,
// token 10650,
ves_icall_ModuleBuilder_basic_init_raw,
// token 10651,
ves_icall_ModuleBuilder_set_wrappers_type_raw,
// token 10658,
ves_icall_ModuleBuilder_getUSIndex_raw,
// token 10659,
ves_icall_ModuleBuilder_getToken_raw,
// token 10660,
ves_icall_ModuleBuilder_getMethodToken_raw,
// token 10665,
ves_icall_ModuleBuilder_RegisterToken_raw,
// token 10740,
ves_icall_TypeBuilder_create_runtime_class_raw,
// token 11253,
ves_icall_System_IO_Stream_HasOverriddenBeginEndRead_raw,
// token 11254,
ves_icall_System_IO_Stream_HasOverriddenBeginEndWrite_raw,
// token 11756,
ves_icall_System_Diagnostics_Debugger_IsLogging,
// token 11757,
ves_icall_System_Diagnostics_Debugger_Log,
// token 11762,
ves_icall_System_Diagnostics_StackFrame_GetFrameInfo,
// token 11772,
ves_icall_System_Diagnostics_StackTrace_GetTrace,
// token 12553,
ves_icall_Mono_RuntimeClassHandle_GetTypeFromClass,
// token 12574,
ves_icall_Mono_RuntimeGPtrArrayHandle_GPtrArrayFree,
// token 12576,
ves_icall_Mono_SafeStringMarshal_StringToUtf8,
// token 12578,
ves_icall_Mono_SafeStringMarshal_GFree,
};
static uint8_t corlib_icall_flags [] = {
0,
0,
0,
0,
0,
4,
4,
0,
4,
0,
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
